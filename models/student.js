const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, minlength: 8, required: true },
  profilePicture: String, // URL for profile picture
  department: { type: mongoose.Schema.Types.ObjectId, ref: "Department" }, // Reference to Department
  courses: [{ type: mongoose.Schema.Types.ObjectId, ref: "Course" }], // Reference to the Course and get list
  subjects: [{ type: mongoose.Schema.Types.ObjectId, ref: "Subject" }], // Reference to the Subject and get list
  classes: [{ type: mongoose.Schema.Types.ObjectId, ref: "Class" }], // // // Reference to the Classes and get list
  attendance: [{ type: mongoose.Schema.Types.ObjectId, ref: "Attendance" }], // Link Attendance Records
  notifications: [
    {
      title: String,
      message: String,
      read: { type: Boolean, default: false },
      createdAt: { type: Date, default: Date.now }
    }
  ],
  assignments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Assignment" }],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Student", studentSchema);
