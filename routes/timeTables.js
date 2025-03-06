var express = require("express");
var router = express.Router();
var TimeTables = require("../models/timetable");
const pagination = require("../config/pagination");

// Get Time table
router.get("/get", function (req, res) {
  TimeTables.findOne({ classId: req.query.class_id }, function (err, result) {
    if (err) {
      res.status(422);
      res.json({
        err
      });
    } else {
      res.json(result);
    }
  });
});
// Add Time table
router.post("/add", async function (req, res) {
  let data = req.body;
  let table = new TimeTables();
  let updateTime = {};
  switch (data.day) {
    case "Monday":
      table.monday = data.table;
      updateTime = { monday: data.table };
      break;
    case "Tuesday":
      table.tuesday = data.table;
      updateTime = { tuesday: data.table };
      break;
    case "Wednesday":
      table.wednesday = data.table;
      updateTime = { wednesday: data.table };
      break;
    case "Thursday":
      table.thursday = data.table;
      updateTime = { thursday: data.table };
      break;
    case "Friday":
      table.friday = data.table;
      updateTime = { friday: data.table };

      break;
    case "Saturday":
      table.saturday = data.table;
      updateTime = { saturday: data.table };
      break;
    default:
      null;
  }

  await TimeTables.findOne({ classId: data.classId }, async function (err, result) {
    if (err) {
      res.status(422);
      res.json({
        err
      });
    } else if (result == null) {
      (table.classId = data.classId),
        table.save(function (err, time) {
          if (err) throw err;
          res.status(200).json({
            status: 200,
            message: `${data.day} time table added successfully`,
            data: time
          });
        });
    } else {
      let query = { classId: data.classId };
      await TimeTables.updateOne(query, updateTime, function (err, t) {
        if (err) throw err;
        res.status(200).json({
          status: 200,
          message: `${data.day} time table added successfully`
        });
      });
    }
  });
});
// Delete Time table
router.delete("/delete/:id", function (req, res) {
  TimeTables.deleteOne({ classId: req.params.id })
    .exec()
    .then((result) => {
      res.status(200).json({
        message: "Time Table Deleted"
      });
    })
    .catch((err) => {
      res.status(500).json({
        err
      });
    });
});
module.exports = router;
