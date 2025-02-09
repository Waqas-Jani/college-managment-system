const mongoose = require("mongoose");

const classSchema = new mongoose.Schema({
  name: { type: String, required: true }, // Class name (e.g., CS101 - Batch A, MBA - Evening Class)
  course: { type: mongoose.Schema.Types.ObjectId, ref: "Course" }, // Reference to the Course
  subjects: [
    {
      subject: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Subject",
        required: true,
      }, // Subject assigned
      faculty: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Faculty",
        required: true,
      }, // Faculty assigned to teach the subject
    },
  ],
  students: [{ type: mongoose.Schema.Types.ObjectId, ref: "Student" }], // List of enrolled students
  schedule: { type: mongoose.Schema.Types.ObjectId, ref: "Timetable" }, // Schedule for the class
  attendanceRecords: [
    { type: mongoose.Schema.Types.ObjectId, ref: "Attendance" },
  ],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Class", classSchema);
