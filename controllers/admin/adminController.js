const {
  findAllAdmins,
  updateAdminById,
  deleteAdminById,
  changeAdminPasswordById,
  updateAdminProfileById
} = require("../../services/adminService");

const {
  updateBySuperAdminSchema,
  updatePwdSchema,
  updateProfileSchema
} = require("../../utils/validationsSchema");

// get all admins
const getAllAdmins = async (req, res, next) => {
  try {
    const admins = await findAllAdmins();

    res.status(200).json({ data: admins });
  } catch (error) {
    next(error);
  }
};

// Update the admin by super admin
const updateAdminBySuper = async (req, res, next) => {
  const { id } = req.params;

  try {
    const { error } = updateBySuperAdminSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error?.details?.map((val) => val.message) });
    }

    const updated = await updateAdminById(id, req.body);

    const obj = {
      id: updated._id,
      name: updated.name,
      email: updated.email,
      role: updated.role
    };

    res.status(200).json({ message: "Admin updated successfully", data: obj });
  } catch (error) {
    next(error);
  }
};

// Delete the admin by super admin
const deleteAdminBySuper = async (req, res, next) => {
  try {
    await deleteAdminById(req);

    res.status(200).json({ message: "Admin removed successfully." });
  } catch (error) {
    next(error);
  }
};

// Update the admin by super admin
const updateAdminPassword = async (req, res, next) => {
  try {
    const { error } = updatePwdSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error?.details?.map((val) => val.message) });
    }
    await changeAdminPasswordById(req);

    res.status(200).json({ message: "Password has been changed successfully." });
  } catch (error) {
    next(error);
  }
};

// Update the admin profile
const updateAdminProfile = async (req, res, next) => {
  try {
    const { error } = updateProfileSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error?.details?.map((val) => val.message) });
    }

    const updated = await updateAdminProfileById(req);

    const obj = {
      id: updated._id,
      name: updated.name,
      email: updated.email,
      role: updated.role
    };

    res.status(200).json({ message: "Admin updated successfully.", data: obj });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllAdmins,
  updateAdminBySuper,
  deleteAdminBySuper,
  updateAdminPassword,
  updateAdminProfile
};
