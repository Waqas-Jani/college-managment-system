var express = require("express");
var router = express.Router();
var Assignments = require("../models/assignment");
const pagination = require("../config/pagination");

// Get Assignments
router.get("/get", pagination(Assignments), function (req, res) {
  res.json(res.paginatedResults);
});
// Add Assignment
router.post("/add", function (req, res) {
  let clas = JSON.parse(req.body.class);
  let subject = JSON.parse(req.body.subject);
  const assignment = new Assignments({
    title: req.body.title,
    description: req.body.description,
    file_url: req.body.file_url,
    dead_line: req.body.dead_line,
    class: {
      id: clas.classId,
      name: clas.name
    },
    subject: {
      id: subject.subId,
      name: subject.name
    }
  });
  assignment
    .save()
    .then((result) => {
      res.status(200).json({
        status: 200,
        message: "Assignment added successfully",
        data: "OK"
      });
    })
    .catch((err) => {
      res.status(500).json({
        error: err
      });
    });
});
// Delete Assignment
router.delete("/delete/:id", function (req, res) {
  Assignments.deleteOne({ _id: req.params.id })
    .exec()
    .then((result) => {
      res.status(200).json({
        message: "Subject Deleted"
      });
    })
    .catch((err) => {
      res.status(500).json({
        err
      });
    });
});
module.exports = router;
