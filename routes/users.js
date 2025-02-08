var express = require("express");
const bcrypt = require("bcrypt");
var router = express.Router();
var User = require("../models/user");
const pagination = require("../config/pagination");
var passport = require("passport");
const initializePassport = require("../config/passport.config");
initializePassport(passport, User.getUserByEmail, User.getUserById);
const Joi = require("@hapi/joi");
const RegisterSchema = Joi.object({
  reg_id: Joi.number().required(),
  class: Joi.string(),
  is_admin: Joi.number().max(1).required(),
});
const updateSchema = Joi.object({
  reg_id: Joi.number().required(),
  name: Joi.string().required(),
  email: Joi.string().email({
    minDomainSegments: 2,
    tlds: { allow: ["com", "net"] },
  }),
  password: Joi.string()
    .required()
    .pattern(/^[a-zA-Z0-9]{3,30}$/),
  is_admin: Joi.number().max(1).required(),
});
// Register User
router.post("/register", async (req, res) => {
  let obj = JSON.parse(req.body.class);
  // validate the request data against the schema
  try {
    const value = await RegisterSchema.validateAsync(req.body);
    await User.findOne({ reg_id: value.reg_id }, async (err, reg) => {
      if (err) {
        res.status(500).json({
          status: 500,
          message: "Something went wrong",
        });
      } else if (reg) {
        res.status(422).json({
          status: 422,
          message: "Duplicate Registration not allow",
        });
      } else {
        var newUser = new User({
          reg_id: value.reg_id,
          name: "",
          email: "",
          password: "",
          class: {
            id: obj.classId,
            name: obj.name,
          },
          is_admin: value.is_admin,
        });
        await User.createUser(newUser, function (err, user) {
          if (err) throw err;
          res.status(200).json({
            status: 200,
            message: "Student registration created successfully",
            data: user,
          });
        });
      }
    });
  } catch (err) {
    res.status(400).json({
      status: 400,
      message: err.details[0].message,
      detail: "Invalid parameters",
    });
  }
});
// Update user
router.put("/register", async (req, res) => {
  // validate the request data against the schema
  try {
    const value = await updateSchema.validateAsync(req.body);
    await User.findOne(
      { reg_id: value.reg_id, registered: false },
      async (err, reg) => {
        if (err) {
          res.status(500).json({
            status: 500,
            message: "Something went wrong",
          });
        } else if (reg) {
          await User.findOne({ email: value.email }, async (err, email) => {
            if (email) {
              res.status(422).json({
                status: 422,
                message: "Duplicate email not allow",
              });
            } else {
              const saltRounds = 10;
              const salt = await bcrypt.genSaltSync(saltRounds);
              const hash = await bcrypt.hashSync(value.password, salt);
              var std = {
                reg_id: value.reg_id,
                name: value.name,
                email: value.email,
                password: hash,
                registered: true,
                is_admin: value.is_admin,
              };
              let query = { reg_id: value.reg_id };
              await User.updateOne(query, std, function (err, user) {
                if (err) throw err;
                res.status(200).json({
                  status: 200,
                  message: "Student created successfully",
                  data: user,
                });
              });
            }
          });
        } else {
          res.status(422).json({
            status: 422,
            message: "Invalid Registration #",
          });
        }
      }
    );
  } catch (err) {
    res.status(400).json({
      status: 400,
      message: err.details[0].message,
      detail: "Invalid parameters",
    });
  }
});
// Login
router.post(
  "/login",
  passport.authenticate("local", { failureFlash: true }),
  function (req, res) {
    if (req.body.is_admin === req.user.is_admin) {
      res.status(200).json(req.user);
    } else {
      req.logout();
      res.sendStatus(401);
    }
  }
);
// Logout
router.get("/logout", function (req, res) {
  if (req.user) {
    req.logout();
    res.status(200).json({
      message: "Success",
    });
  } else {
    res.status(401).json({
      message: "User does not exist",
    });
  }
});
//Check user existence from client side
router.get("/check", (req, res) => {
  if (req.user) {
    res.status(200).json({
      user: true,
    });
  } else {
    res.status(401).json({
      user: false,
    });
  }
});

// Get User List
router.get("/get", userPagination(User), function (req, res) {
  res.json(res.paginatedResults);
});
// Get Student by subject base
router.get("/get/class", pagination(User), function (req, res) {
  res.json(res.paginatedResults);
});
// Delete User
router.delete("/delete/:id", function (req, res) {
  // Delete User
  User.deleteOne({ _id: req.params.id })
    .exec()
    .then((result) => {
      res.status(200).json({
        message: "User Deleted",
      });
    })
    .catch((err) => {
      res.status(500).json({
        err,
      });
    });
});

//only for user
function userPagination(model) {
  return async (req, res, next) => {
    let page = 1;
    let limit = 12;
    if (Object.keys(req.query).length !== 0) {
      if (req.query.page !== undefined) {
        page = parseInt(req.query.page);
      }
      if (req.query.limit !== undefined) {
        limit = parseInt(req.query.limit);
      }
    }
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const results = {};
    if (endIndex < (await model.countDocuments().exec())) {
      results.next = {
        page: page + 1,
        limit: limit,
      };
    }
    if (startIndex > 0) {
      results.previous = {
        page: page - 1,
        limit: limit,
      };
    }
    try {
      results.results = await model
        .find({ is_admin: 0 })
        .limit(limit)
        .skip(startIndex)
        .exec();
      res.paginatedResults = results;
      next();
    } catch (e) {
      res.status(500).json({ message: e.message });
    }
  };
}
module.exports = router;
