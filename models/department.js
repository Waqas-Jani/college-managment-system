var mongoose = require("mongoose");

const departmentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  courses: [{ type: mongoose.Schema.Types.ObjectId, ref: "Course" }], // Reference to the Course and get list
  faculty: [{ type: mongoose.Schema.Types.ObjectId, ref: "Faculty" }], // Reference to the Faculty and get list
  updatedBy: { type: mongoose.Schema.Types.ObjectId, ref: "Admin" }, // Reference to the Admin
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Department", departmentSchema);
