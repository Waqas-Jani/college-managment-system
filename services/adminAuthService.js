const jwt = require("jsonwebtoken");
const Admin = require("../models/admin");
const { hashPassword, comparePassword } = require("../utils/bcryptPassword");

// Create the admin unique entry by email
const createAdmin = async (data, next) => {
  const { name, email, password, role } = data;
  const admin = await Admin.findOne({ email });
  if (admin) {
    const error = new Error("Admin with this email already exists.");
    error.statusCode = 409;
    return next(error);
  }

  const hashPwd = await hashPassword(password);

  const newAdmin = new Admin({ name, email, password: hashPwd, role });
  await newAdmin.save();

  return newAdmin;
};

// Verify the login cradentials of admin or super admin
const adminVerification = async (data, next) => {
  const { email, password } = data;
  const admin = await Admin.findOne({ email });

  if (!admin) {
    const error = new Error("Invalid email or password.");
    error.statusCode = 401;
    return next(error);
  }

  const isMatch = await comparePassword(password, admin.password);
  if (!isMatch) {
    const error = new Error("Invalid email or password.");
    error.statusCode = 401;
    return next(error);
  }
  return admin;
};

// Generate JWT Token
const generateToken = (data) => {
  return jwt.sign(data, process.env.JWT_SECRET_KEY, {
    expiresIn: "1d",
  });
};

module.exports = {
  createAdmin,
  adminVerification,
  generateToken,
};
