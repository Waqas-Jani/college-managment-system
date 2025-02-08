const {
  courseSchema,
  optionalCourseSchema,
} = require("../utils/validationsSchema");

const {
  createCourse,
  findCourses,
  updateCourseById,
  deleteCourseById,
} = require("../services/courseService");

// get all courses with pagination
const getCourses = async (req, res, next) => {
  const { limit, page, name, u_ref, d_ref, f_ref, sort_by } = req.query;
  let populateOptions = [];
  let query = {};
  if (u_ref)
    populateOptions.push({ path: "updatedBy", select: "name role email" });
  if (d_ref) populateOptions.push({ path: "department", select: "name" });
  if (f_ref) populateOptions.push({ path: "faculty", select: "name email" });

  if (name) {
    query.name = { $regex: name, $options: "i" }; // Case-insensitive search
  }

  try {
    const courses = await findCourses({
      limit,
      page,
      query,
      populateOptions,
      sort_by,
    });
    res.status(200).json(courses);
  } catch (error) {
    next(error);
  }
};

// create course
const postCourse = async (req, res, next) => {
  const { name, code } = req.body;

  try {
    const { error } = courseSchema.validate({
      name,
      code,
    });
    if (error) {
      return res
        .status(400)
        .json({ message: error?.details?.map((val) => val.message) });
    }

    const course = await createCourse(req.body);

    res
      .status(201)
      .json({ message: "Course created successfully.", data: course });
  } catch (error) {
    next(error);
  }
};

// update department by id
const updateCourse = async (req, res, next) => {
  const { id } = req.params;
  try {
    const { error } = optionalCourseSchema.validate(req.body);
    if (error) {
      return res
        .status(400)
        .json({ message: error?.details.map((val) => val.message) });
    }
    const updated = await updateCourseById(id, req.body);
    res
      .status(200)
      .json({ message: "Department updated successfully.", data: updated });
  } catch (error) {
    next(error);
  }
};
// delete course by id
const deleteCourse = async (req, res, next) => {
  const { id } = req.params;

  try {
    await deleteCourseById(id);

    res.status(200).json({ message: "Course removed successfully." });
  } catch (error) {
    next(error);
  }
};

module.exports = { postCourse, getCourses, deleteCourse, updateCourse };
