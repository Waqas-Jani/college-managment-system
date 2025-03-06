var mongoose = require("mongoose");

const timetableSchema = new mongoose.Schema({
  department: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Department",
    required: true
  }, // Department for which the timetable is created
  day: {
    type: String,
    enum: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
    required: true
  }, // Day of the week
  schedule: [
    {
      timeSlot: { type: String, required: true }, // Example: "10:00 AM - 11:00 AM"
      subject: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Subject",
        required: true
      }, // Subject being taught
      faculty: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Faculty",
        required: true
      }, // Faculty assigned
      class: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Class",
        required: true
      } // Class that attends the lecture
    }
  ],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Timetable", timetableSchema);
