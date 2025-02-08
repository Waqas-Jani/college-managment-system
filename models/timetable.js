var mongoose = require("mongoose");

const timetableSchema = new mongoose.Schema({
  department: { type: mongoose.Schema.Types.ObjectId, ref: "Department" }, // Reference to the Department
  day: { type: String, required: true },
  schedule: [
    {
      time: String,
      subject: { type: mongoose.Schema.Types.ObjectId, ref: "Subject" }, // Reference to the Subject
      faculty: { type: mongoose.Schema.Types.ObjectId, ref: "Faculty" }, // Reference to the Faculty
    },
  ],
});

module.exports = mongoose.model("Timetable", timetableSchema);
