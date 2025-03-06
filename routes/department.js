var express = require("express");
var router = express.Router();
var Department = require("../models/department");
const pagination = require("../config/pagination");

// Get Departments
router.get("/get", pagination(Department), function (req, res) {
  res.json(res.paginatedResults);
});
// Get all Departments
router.get("/get/all", function (req, res) {
  Department.find({})
    .then((data) => {
      if (data.length === 0) {
        return res.status(404).json({ message: "No record found!" });
      }

      res.status(200).send(data);
    })
    .catch((err) =>
      res.status(422).json({
        message: err.message
      })
    );
});
// Add Department
router.post("/add", async function (req, res) {
  try {
    const data = await Department.create({
      name: req.body.name,
      description: req.body.description
    });

    res.status(201).json({ message: "Record created" });
  } catch (error) {
    if (error.name === "ValidationError") {
      for (let field in error.errors) {
        res.status(400).json({ message: `${field}: ${error.errors[field].message}` });
      }
    } else {
      res.status(500).json({ message: "Unexpected error!" });
    }
  }
});
// Delete Department
router.delete("/delete/:id", async function (req, res) {
  // Delete User

  try {
    const result = await Department.deleteOne({ _id: req.params.id });
    if (result.deletedCount === 0) {
      res.status(404).json({
        message: "No document found with the specified id"
      });
    } else {
      res.status(200).json({
        message: "Department Deleted"
      });
    }
  } catch (error) {
    console.error("Error deleting document:", error.message);
    res.status(500).json({
      message: error?.message
    });
  }
});
// Edit Department
router.put("/edit/:id", async function (req, res) {
  try {
    const record = await Department.findOne({ _id: req.params.id });
    if (!record) {
      return res.status(404).json({
        message: "No matching department found to update"
      });
    }

    record.name = req.body?.name;
    record.description = req.body?.description;

    await record.save();

    res.status(200).json({ message: "Department updated successfully!", data: record });
  } catch (error) {
    if (error.name === "CastError") {
      res.status(400).json({ message: `Invalid ID format: ${error?.message}` });
    } else if (error.name === "ValidationError") {
      for (let field in error.errors) {
        res.status(400).json({ message: `${field}: ${error.errors[field].message}` });
      }
    } else {
      res.status(500).json({ message: "Unexpected error!" });
    }
  }
});
module.exports = router;
