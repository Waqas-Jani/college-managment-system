const Course = require("../models/course");
const CustomError = require("../utils/customErros");
const { simplePagination } = require("../utils/pagination");

// create course
const createCourse = async (data) => {
  const isCourseExist = await Course.findOne({ code: data.code });
  if (isCourseExist) {
    throw new CustomError("Course code already exist.", 409);
  }
  const course = new Course(data);
  await course.save();
  return course;
};

// find courses with pagination and filter
const findCourses = async ({ limit, page, query, populateOptions, sortBy }) => {
  const courses = await simplePagination(
    Course,
    Number(page),
    Number(limit),
    query,
    populateOptions,
    sortBy
  );

  return courses;
};

const updateCourseById = async (id, data) => {
  if (data.code) {
    const course = await Course.findById(id);
    if (!course) {
      throw new CustomError(`Record with ID ${id} not found. `, 404);
    }
    if (data.code !== course.code) {
      const isCourseExist = await Course.findOne({ code: data.code });
      if (isCourseExist) {
        throw new CustomError("Code name already exists.", 409);
      }
    }
  }

  const updated = await Course.findByIdAndUpdate(id, { $set: data }, { new: true });
  if (!updated) {
    throw new CustomError(`Record with ID ${id} not found. `, 404);
  }
  return updated;
};

// delete course by id
const deleteCourseById = async (id) => {
  const deleted = await Course.findByIdAndDelete(id);
  if (!deleted) {
    throw new CustomError("Course not found or already removed.", 404);
  }
  return deleted;
};

module.exports = {
  createCourse,
  findCourses,
  updateCourseById,
  deleteCourseById
};
