const Department = require("../models/department");
const CustomError = require("../utils/customErros");
const { simplePagination } = require("../utils/pagination");

// create department
const createDeparment = async (data) => {
  const isNameExist = await Department.findOne({ name: data.name });
  if (isNameExist) {
    throw new CustomError("Name already exist.", 409);
  }
  const department = new Department(data);
  await department.save();
  return department;
};

// find departments with pagination and filter
const findDepartments = async ({ limit, page, query, populateOptions, sortBy }) => {
  const departments = await simplePagination(
    Department,
    Number(page),
    Number(limit),
    query,
    populateOptions,
    sortBy
  );

  return departments;
};

// update department by id
const updateDepartmentById = async (id, data) => {
  //   check if name exist then check duplicates and update safely
  if (data.name) {
    const department = await Department.findById(id);
    if (!department) {
      throw new CustomError(`Record with ID ${id} not found. `, 404);
    }
    if (data.name !== department.name) {
      const isNameExist = await Department.findOne({ name: data.name });
      if (isNameExist) {
        throw new CustomError("Department name already exists.", 409);
      }
    }
  }
  // if name not change then bypass the if statement and find & update
  const updated = await Department.findByIdAndUpdate(id, { $set: data }, { new: true });
  if (!updated) {
    throw new CustomError(`Record with ID ${id} not found. `, 404);
  }
  return updated;
};

// delete department by id
const deleteDepartmentById = async (id) => {
  const deleted = await Department.findByIdAndDelete(id);
  if (!deleted) {
    throw new CustomError("Department not found or already removed.", 404);
  }
  return deleted;
};

module.exports = {
  createDeparment,
  findDepartments,
  updateDepartmentById,
  deleteDepartmentById
};
