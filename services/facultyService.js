const Faculty = require("../models/faculty");
const { hashPassword, comparePassword } = require("../utils/bcryptPassword");
const { simplePagination } = require("../utils/pagination");
const CustomError = require("../utils/customErros");

// Create the admin unique entry by email
const createFaculty = async (data) => {
  const { name, email, password, role, updatedBy, departments, courses } = data;
  const faculty = await Faculty.findOne({ email });
  if (faculty) {
    throw new Error("Faculy member with this email already exists.", 409);
  }

  const hashPwd = await hashPassword(password);

  const newFaculty = new Faculty({
    name,
    email,
    password: hashPwd,
    role,
    updatedBy,
    departments,
    courses,
  });
  await newFaculty.save();

  return newFaculty;
};

// Verify the login cradentials of faculty
const facultyVerification = async (data) => {
  const { email, password } = data;
  const faculty = await Faculty.findOne({ email });

  if (!faculty) {
    throw new Error("Invalid email or password.", 401);
  }

  const isMatch = await comparePassword(password, faculty.password);
  if (!isMatch) {
    throw new Error("Invalid email or password.", 401);
  }
  return faculty;
};

// Find faculties with pagination and filter
const findFaculties = async ({
  limit,
  page,
  query,
  populateOptions,
  sortBy,
}) => {
  let select = "-password";
  const faculties = await simplePagination(
    Faculty,
    Number(page),
    Number(limit),
    query,
    populateOptions,
    sortBy,
    select
  );

  return faculties;
};

// Update faculty by admin with id. only admin has permission
const updateFacultyByAdminById = async (id, data) => {
  //   check if email exist then check duplicates and update safely
  if (data.email) {
    const faculty = await Faculty.findById(id);
    if (!faculty) {
      throw new CustomError(`Record with ID ${id} not found. `, 404);
    }
    if (data.email !== faculty.email) {
      const isEmailExist = await Faculty.findOne({ email: data.email });
      if (isEmailExist) {
        throw new CustomError(
          "Faculty member with this email already exists.",
          409
        );
      }
    }
  }
  //   if email not change then bypass the if statement and find & update
  const updated = await Faculty.findByIdAndUpdate(
    id,
    { $set: data },
    { new: true }
  );
  if (!updated) {
    throw new CustomError(`Record with ID ${id} not found. `, 404);
  }
  return updated;
};

// Delete faculty by id
const deleteFacultyById = async (id) => {
  const deleted = await Faculty.findByIdAndDelete(id);
  if (!deleted) {
    throw new CustomError("Faculty member not found or already removed.", 404);
  }
  return deleted;
};

// Change faculty password
const changeFacultyPasswordById = async (id, data) => {
  const faculty = await Faculty.findById(id);
  if (!faculty) throw new CustomError("User does not exist.", 404);

  const isMatch = await comparePassword(data?.old_password, faculty.password);
  if (!isMatch)
    throw new CustomError("Incorrect old password. Please try again!", 400);

  const hashPwd = await hashPassword(data.password);

  faculty.password = hashPwd;
  return await faculty.save();
};

const updateFacultyProfileById = async (id, { name }) => {
  const updated = await Faculty.findByIdAndUpdate(
    id,
    { $set: { name } },
    { new: true }
  );
  if (!updated) {
    throw new CustomError(`Record with ID ${id} not found. `, 404);
  }
  return updated;
};

module.exports = {
  createFaculty,
  facultyVerification,
  findFaculties,
  updateFacultyByAdminById,
  deleteFacultyById,
  changeFacultyPasswordById,
  updateFacultyProfileById,
};
