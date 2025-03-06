const Admin = require("../models/admin");
const CustomError = require("../utils/customErros");
const { comparePassword, hashPassword } = require("../utils/bcryptPassword");

const findAllAdmins = async () => {
  const admins = await Admin.find({}).select("-password");

  return admins;
};

// Update the admin entry by id (Super)
const updateAdminById = async (id, data) => {
  //   check if email exist then check duplicates and update safely
  if (data.email) {
    const admin = await Admin.findById(id);
    if (!admin) {
      throw new CustomError(`Record with ID ${id} not found. `, 404);
    }
    if (data.email !== admin.email) {
      const isEmailExist = await Admin.findOne({ email: data.email });
      if (isEmailExist) {
        throw new CustomError("Admin with this email already exists.", 409);
      }
    }
  }
  //   if email not change then bypass the if statement and find & update

  const updated = await Admin.findByIdAndUpdate(id, { $set: data }, { new: true });
  if (!updated) {
    throw new CustomError(`Record with ID ${id} not found. `, 404);
  }

  return updated;
};

// Delelte the admin entry by id (Super)
const deleteAdminById = async (req) => {
  const { id } = req.params;

  const deleted = await Admin.findByIdAndDelete(id);

  if (!deleted) {
    throw new CustomError("Admin not found or already removed", 404);
  }

  return deleted;
};

// Change admin password (both can)
const changeAdminPasswordById = async (req) => {
  const { id } = req.params;
  const { old_password, password } = req.body;
  const admin = await Admin.findById(id);
  if (!admin) throw new CustomError("User does not exist", 404);

  const isMatch = await comparePassword(old_password, admin.password);
  if (!isMatch) throw new CustomError("Incorrect old password. Please try again!", 400);

  const hashPwd = await hashPassword(password);

  admin.password = hashPwd;
  return await admin.save();
};

// Update admin profile
const updateAdminProfileById = async (req) => {
  const { id } = req.params;
  const { name } = req.body;

  const updated = await Admin.findByIdAndUpdate(id, { $set: { name } }, { new: true });
  if (!updated) {
    throw new CustomError(`Record with ID ${id} not found. `, 404);
  }
  return updated;
};

module.exports = {
  findAllAdmins,
  updateAdminById,
  deleteAdminById,
  changeAdminPasswordById,
  updateAdminProfileById
};
