const express = require("express");
const router = express.Router();
const Classes = require("../models/class");
const pagination = require("../config/pagination");
// Get classes with paginations
router.get("/get", pagination(Classes), function (req, res) {
  res.json(res.paginatedResults);
});
// Get all Classes
router.get("/get/all", function (req, res) {
  Classes.find({})
    .then((data) => {
      if (data.length === 0) {
        return res.status(404).json({ message: "No record found!" });
      }

      res.status(200).send(data);
    })
    .catch((err) =>
      res.status(422).json({
        message: err.message,
      })
    );
});
// Add Class
router.post("/add", function (req, res) {
  let obj = JSON.parse(req.body.department);
  let newClass = new Classes({
    name: req.body.name,
    department: {
      id: obj.depId,
      name: obj.name,
    },
  });
  Classes.create(newClass, function (err, clas) {
    if (err) throw err;
    res.status(200).json({
      status: 200,
      message: "Class added successfully",
      data: clas,
    });
  });
});
// Delete Class
router.delete("/delete/:id", function (req, res) {
  // Delete User
  Classes.deleteOne({ _id: req.params.id })
    .exec()
    .then((result) => {
      res.status(200).json({
        message: "Class Deleted",
      });
    })
    .catch((err) => {
      res.status(500).json({
        err,
      });
    });
});
// Edit Class
router.put("/edit/:id", function (req, res) {
  let obj = JSON.parse(req.body.department);
  Classes.findOne({ _id: req.params.id }, (err, dep) => {
    if (err) {
      res.status(500).json({
        status: 500,
        message: "Something went wrong",
      });
    } else if (dep) {
      var editClass = {
        name: req.body.name,
        credit_hour: req.body.credit_hour,
        department: {
          id: obj.depId,
          name: obj.name,
        },
      };
      let query = { _id: req.params.id };
      Classes.updateOne(query, editClass, function (err, de) {
        if (err) throw err;
        res.status(200).json({
          status: 200,
          message: "Department updated successfully",
        });
      });
    } else {
      res.status(500).json({
        status: 500,
        message: "Something went wrong",
      });
    }
  });
});
module.exports = router;
