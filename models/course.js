const mongoose = require("mongoose");
const courseSchema = new mongoose.Schema({
  name: { type: String, required: true },
  code: { type: String, required: true },
  department: { type: mongoose.Schema.Types.ObjectId, ref: "Department" }, // Reference to the Department
  faculty: { type: mongoose.Schema.Types.ObjectId, ref: "Faculty" }, // Reference to the Faculty
  students: [{ type: mongoose.Schema.Types.ObjectId, ref: "Student" }], // Reference to the Students and get List
  updatedBy: { type: mongoose.Schema.Types.ObjectId, ref: "Admin" }, // Reference to the Admin
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Course", courseSchema);
