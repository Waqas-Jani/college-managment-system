const mongoose = require("mongoose");

const assignmentSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  subject: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Subject",
    required: true
  },
  faculty: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Faculty",
    required: true
  },
  class: { type: mongoose.Schema.Types.ObjectId, ref: "Class", required: true },
  dueDate: { type: Date, required: true },
  totalMarks: { type: Number, required: true },
  attachments: [{ type: String }], // URLs to uploaded assignment files
  submissions: [
    {
      student: { type: mongoose.Schema.Types.ObjectId, ref: "Student" },
      submittedAt: { type: Date, default: Date.now },
      fileUrl: { type: String, required: true }, // Link to submitted file
      marksObtained: { type: Number, default: null },
      feedback: { type: String, default: "" }
    }
  ],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now } // Timestamp
});

module.exports = mongoose.model("Assignment", assignmentSchema);
