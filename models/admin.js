// models/Admin.js
const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, minlength: 8, required: true },
  role: { type: String, enum: ["Admin", "SuperAdmin"], default: "Admin" }, // Admin roles
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

// // Hash password before saving
// adminSchema.pre("save", async function (next) {
//   if (!this.isModified("password")) return next();
//   const salt = await bcrypt.genSalt(10);
//   this.password = await bcrypt.hash(this.password, salt);
//   next();
// });

// // Pre-findOneAndUpdate middleware (works with update methods)
// adminSchema.pre("findOneAndUpdate", async function (next) {
//   const update = this.getUpdate();

//   if (update.password) {
//     const salt = await bcrypt.genSalt(10);
//     update.password = await bcrypt.hash(update.password, salt);
//   }

//   next();
// });

// // Compare hashed passwords
// adminSchema.methods.comparePassword = async function (password) {
//   return await bcrypt.compare(password, this.password);
// };

module.exports = mongoose.model("Admin", adminSchema);
