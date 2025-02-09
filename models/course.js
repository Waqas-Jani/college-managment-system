const mongoose = require("mongoose");
const courseSchema = new mongoose.Schema({
  name: { type: String, required: true },
  code: { type: String, required: true },
  department: { type: mongoose.Schema.Types.ObjectId, ref: "Department" }, // Reference to the Department
  subjects: [{ type: mongoose.Schema.Types.ObjectId, ref: "Subject" }],
  updatedBy: { type: mongoose.Schema.Types.ObjectId, ref: "Admin" }, // Reference to the Admin
  duration: Number, // Duration in years e.g 2, 4 years program
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Course", courseSchema);
