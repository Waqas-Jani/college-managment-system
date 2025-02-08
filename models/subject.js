const mongoose = require("mongoose");

const subjectSchema = new mongoose.Schema({
  name: { type: String, required: true },
  code: { type: String, required: true },
  credit_hour: { type: String },
  file_url: { type: String },
  department: { type: mongoose.Schema.Types.ObjectId, ref: "Department" }, // Reference to the Department
  faculty: { type: mongoose.Schema.Types.ObjectId, ref: "Faculty" }, // Reference to the Faculty
  students: [{ type: mongoose.Schema.Types.ObjectId, ref: "Student" }], // Reference to the Student and get list
});

module.exports = mongoose.model("Subject", subjectSchema);
