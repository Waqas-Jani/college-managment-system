const express = require("express");
const router = express.Router();
const { verifyToken, allowedRoles } = require("../../middleware/auth");
const {
  postCourse,
  getCourses,
  updateCourse,
  deleteCourse
} = require("../../controllers/courseController");

// Create course by Super & Admin
router.post("/", verifyToken, allowedRoles("SuperAdmin", "Admin"), postCourse);

// Get courses by Super & Admin with pagination and filters
router.get("/all", verifyToken, allowedRoles("SuperAdmin", "Admin"), getCourses);

// Update course by Super & Admin
router.put("/edit/:id", verifyToken, allowedRoles("SuperAdmin", "Admin"), updateCourse);

// Delete course by Super & Admin
router.delete("/:id", verifyToken, allowedRoles("SuperAdmin", "Admin"), deleteCourse);

module.exports = router;
