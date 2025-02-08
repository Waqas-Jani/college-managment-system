require("dotenv").config();
const mongoose = require("mongoose");
const Admin = require("../models/admin");
const { hashPassword } = require("../utils/bcryptPassword");

const createSuperAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    const superAdminExists = await Admin.findOne({ role: "SuperAdmin" });
    if (superAdminExists) {
      console.log("SuperAdmin already exists");
      process.exit(0);
    }
    const hash = await hashPassword("Abc1234_");

    const superAdmin = new Admin({
      name: "Muhammad Waqas",
      email: "waqas@gmail.com",
      password: hash,
      role: "SuperAdmin",
    });

    await superAdmin.save();
    console.log("SuperAdmin seeded successfully");
    process.exit(0);
  } catch (error) {
    console.error("Error seeding SuperAdmin:", error);
    process.exit(1);
  }
};

createSuperAdmin();
