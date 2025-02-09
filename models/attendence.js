var mongoose = require("mongoose");

const attendanceSchema = new mongoose.Schema({
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Student",
    required: true,
  }, // Student attending the class
  class: { type: mongoose.Schema.Types.ObjectId, ref: "Class", required: true }, // Class associated with attendance
  subject: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Subject",
    required: true,
  }, // Subject for the attendance
  faculty: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Faculty",
    required: true,
  }, // Faculty taking attendance
  department: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Department",
    required: true,
  }, // Helps organize attendance based on department
  sessions: [
    {
      date: { type: Date, required: true }, // Session date
      status: {
        type: String,
        enum: ["Present", "Absent", "Late"],
        required: true,
      },
      remarks: { type: String }, // Optional: Any comments like "Sick leave"
    },
  ],
  totalClasses: { type: Number, default: 0 },
  attendedClasses: { type: Number, default: 0 },
  percentage: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }, // Timestamp
});

// Auto-calculate attendance percentage before saving
attendanceSchema.pre("save", function (next) {
  if (this.totalClasses > 0) {
    this.percentage = (this.attendedClasses / this.totalClasses) * 100;
  }
  next();
});
module.exports = mongoose.model("Attendence", attendanceSchema);
