const {
  createfacultySchema,
  updatefacultyByAdminSchema,
  loginSchema,
  updatePwdSchema,
  updateProfileSchema
} = require("../utils/validationsSchema");
const { generateToken } = require("../services/adminAuthService");

const {
  createFaculty,
  facultyVerification,
  findFaculties,
  updateFacultyByAdminById,
  deleteFacultyById,
  changeFacultyPasswordById,
  updateFacultyProfileById
} = require("../services/facultyService");

// Register faculty by Super & Admin
const registerFaculty = async (req, res, next) => {
  try {
    const { error } = createfacultySchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error?.details?.map((val) => val.message) });
    }

    const newFaculty = await createFaculty(req.body);

    const obj = {
      id: newFaculty?._id,
      name: newFaculty?.name,
      email: newFaculty?.email,
      role: newFaculty?.role,
      updatedBy: newFaculty.updatedBy,
      departments: newFaculty.departments,
      courses: newFaculty.courses
    };

    res.status(201).json({ message: "Faculty member registered successfully", data: obj });
  } catch (error) {
    next(error);
  }
};

// Login admin or super admin
const loginFaculty = async (req, res, next) => {
  try {
    const { error } = loginSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error?.details?.map((val) => val.message) });
    }

    const faculty = await facultyVerification(req.body, next);
    const token = generateToken({
      id: faculty._id,
      role: faculty.role,
      email: faculty.email
    });

    res.json({ token, role: faculty.role });
  } catch (error) {
    next(error);
  }
};

// get all faculty with pagination
const getAllFaculties = async (req, res, next) => {
  const { limit, page, name, u_ref, c_ref, d_ref, sort_by } = req.query;
  let populateOptions = [];
  let query = {};
  if (u_ref) populateOptions.push({ path: "updatedBy", select: "name role email" });
  if (c_ref) populateOptions.push({ path: "courses", select: "name code" });
  if (d_ref) populateOptions.push({ path: "departments", select: "name" });

  if (name) {
    query.name = { $regex: name, $options: "i" }; // Case-insensitive search
  }

  try {
    const faculties = await findFaculties({
      limit,
      page,
      query,
      populateOptions,
      sort_by
    });
    res.status(200).json(faculties);
  } catch (error) {
    next(error);
  }
};

// Update the admin by super admin
const updateFacultyByAdmin = async (req, res, next) => {
  const { id } = req.params;

  try {
    const { error } = updatefacultyByAdminSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error?.details?.map((val) => val.message) });
    }

    const updated = await updateFacultyByAdminById(id, req.body);

    const obj = {
      id: updated._id,
      name: updated.name,
      email: updated.email,
      role: updated?.role,
      updatedBy: updated.updatedBy,
      departments: updated.departments,
      courses: updated.courses
    };

    res.status(200).json({ message: "Admin updated successfully", data: obj });
  } catch (error) {
    next(error);
  }
};

// Delete faculty super & admin with id
const deleteFaculty = async (req, res, next) => {
  const { id } = req.params;
  try {
    await deleteFacultyById(id);

    res.status(200).json({ message: "Faculty member removed successfully." });
  } catch (error) {
    next(error);
  }
};

// Update the faculty
const updateFacultyPassword = async (req, res, next) => {
  const { id } = req.params;
  try {
    const { error } = updatePwdSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error?.details?.map((val) => val.message) });
    }
    await changeFacultyPasswordById(id, req.body);

    res.status(200).json({ message: "Password has been changed successfully." });
  } catch (error) {
    next(error);
  }
};

// Update faculty profile
const updateFacultyProfile = async (req, res, next) => {
  const { id } = req.params;
  try {
    const { error } = updateProfileSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error?.details?.map((val) => val.message) });
    }

    const updated = await updateFacultyProfileById(id, req.body);

    const obj = {
      id: updated._id,
      name: updated.name
    };

    res.status(200).json({ message: "Profile has been updated successfully.", data: obj });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  registerFaculty,
  loginFaculty,
  getAllFaculties,
  updateFacultyByAdmin,
  deleteFaculty,
  updateFacultyPassword,
  updateFacultyProfile
};
