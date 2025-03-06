const mongoose = require("mongoose");

const subjectSchema = new mongoose.Schema({
  name: { type: String, required: true },
  code: { type: String, required: true },
  creditHour: { type: String },
  fileUrl: { type: String },
  department: { type: mongoose.Schema.Types.ObjectId, ref: "Department" }, // Reference to the Department
  attendanceRecords: [{ type: mongoose.Schema.Types.ObjectId, ref: "Attendance" }],
  assignments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Assignment" }],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Subject", subjectSchema);
