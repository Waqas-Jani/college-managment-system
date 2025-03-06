const mongoose = require("mongoose");
const facultySchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, minlength: 8, required: true },
  departments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Department" }], // Reference to the Department and get list
  courses: [{ type: mongoose.Schema.Types.ObjectId, ref: "Course" }], // Reference to the Course and get list
  role: {
    type: String,
    enum: ["HOD", "Professor", "Non-Teaching"],
    default: "Professor"
  },
  assignmentsCreated: [{ type: mongoose.Schema.Types.ObjectId, ref: "Assignment" }],
  updatedBy: { type: mongoose.Schema.Types.ObjectId, ref: "Admin" }, // Reference to the Admin
  attendanceRecords: [{ type: mongoose.Schema.Types.ObjectId, ref: "Attendance" }],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Faculty", facultySchema);
