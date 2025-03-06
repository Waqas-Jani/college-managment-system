const { departmentSchema, optionalDepartmentSchema } = require("../utils/validationsSchema");

const {
  createDeparment,
  findDepartments,
  deleteDepartmentById,
  updateDepartmentById
} = require("../services/departmentService");

// get all department with pagination
const getDepartments = async (req, res, next) => {
  const { limit, page, name, u_ref, c_ref, f_ref, sort_by } = req.query;
  let populateOptions = [];
  let query = {};
  if (u_ref) populateOptions.push({ path: "updatedBy", select: "name role email" });
  if (c_ref) populateOptions.push({ path: "courses", select: "name code" });
  if (f_ref) populateOptions.push({ path: "faculty", select: "name email" });

  if (name) {
    query.name = { $regex: name, $options: "i" }; // Case-insensitive search
  }

  try {
    const departments = await findDepartments({
      limit,
      page,
      query,
      populateOptions,
      sort_by
    });
    res.status(200).json(departments);
  } catch (error) {
    next(error);
  }
};

// create the department
const postDepartment = async (req, res, next) => {
  try {
    const { error } = departmentSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error?.details?.map((val) => val.message) });
    }

    const department = await createDeparment(req.body);

    res.status(201).json({ message: "Department created successfully.", data: department });
  } catch (error) {
    next(error);
  }
};

// update department by id
const updateDepartment = async (req, res, next) => {
  const { id } = req.params;
  try {
    const { error } = optionalDepartmentSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error?.details.map((val) => val.message) });
    }
    const updated = await updateDepartmentById(id, req.body);
    res.status(200).json({ message: "Department updated successfully.", data: updated });
  } catch (error) {
    next(error);
  }
};

// delete the department by id
const deleteDepartment = async (req, res, next) => {
  const { id } = req.params;

  try {
    await deleteDepartmentById(id);

    res.status(200).json({ message: "Department removed successfully." });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  postDepartment,
  getDepartments,
  updateDepartment,
  deleteDepartment
};
