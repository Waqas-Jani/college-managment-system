const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, minlength: 8, required: true },
  profilePicture: String, // URL for profile picture
  department: { type: mongoose.Schema.Types.ObjectId, ref: "Department" }, // Reference to Department
  courses: [{ type: mongoose.Schema.Types.ObjectId, ref: "Course" }], // Reference to the Course and get list
  subjects: [{ type: mongoose.Schema.Types.ObjectId, ref: "Subject" }], // Reference to the Subject and get list
  classes: [{ type: mongoose.Schema.Types.ObjectId, ref: "Classes" }], // // // Reference to the Classes and get list
  attendance: [
    {
      class: { type: mongoose.Schema.Types.ObjectId, ref: "Classes" }, // Reference to the class
      totalClasses: { type: Number, default: 0 },
      attendedClasses: { type: Number, default: 0 },
    },
  ],

  updatedBy: { type: mongoose.Schema.Types.ObjectId, ref: "Admin" }, // Reference to the Admin
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

// Hash password before saving
studentSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Pre-findOneAndUpdate middleware (works with update methods)
studentSchema.pre("findOneAndUpdate", async function (next) {
  const update = this.getUpdate();

  if (update.password) {
    const salt = await bcrypt.genSalt(10);
    update.password = await bcrypt.hash(update.password, salt);
  }

  next();
});

// Compare hashed passwords
studentSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

module.exports = mongoose.model("Student", studentSchema);
