const express = require("express");
const router = express.Router();
const {
  verifySuperAdmin,
  verifyToken,
  allowedRoles,
} = require("../../middleware/auth");
const {
  registerFaculty,
  loginFaculty,
  getAllFaculties,
  updateFacultyByAdmin,
  deleteFaculty,
  updateFacultyPassword,
  updateFacultyProfile,
} = require("../../controllers/facultyController");

// Register faculty by super admin
router.post("/register", verifySuperAdmin, registerFaculty);

// faculty member login
router.post("/login", loginFaculty);

// Get faculties by Super & Admin with pagination and filters
router.get(
  "/all",
  verifyToken,
  allowedRoles("SuperAdmin", "Admin"),
  getAllFaculties
);

// Update faculty by id (Super & Admin)
router.put(
  "/edit/by-admin/:id",
  verifyToken,
  allowedRoles("SuperAdmin", "Admin"),
  updateFacultyByAdmin
);

// Delete admin record by id (Super)
router.delete(
  "/:id",
  verifyToken,
  allowedRoles("SuperAdmin", "Admin"),
  deleteFaculty
);

// Change password
router.put("/change-password/:id", verifyToken, updateFacultyPassword);

// Update faculty profile
router.put("/edit/:id", verifyToken, updateFacultyProfile);

module.exports = router;
