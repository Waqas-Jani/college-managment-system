const mongoose = require("mongoose");

const classSchema = new mongoose.Schema({
  name: { type: String, required: true }, // Class name (e.g., CS101-A)
  course: { type: mongoose.Schema.Types.ObjectId, ref: "Course" }, // Reference to the Course
  subject: { type: mongoose.Schema.Types.ObjectId, ref: "Subject" }, // Reference to the Subject
  faculty: { type: mongoose.Schema.Types.ObjectId, ref: "Faculty" }, // Faculty assigned to the class
  students: [{ type: mongoose.Schema.Types.ObjectId, ref: "Student" }], // List of enrolled students
  schedule: { type: mongoose.Schema.Types.ObjectId, ref: "Timetable" }, // Schedule for the class
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Classes", classSchema);
