const express = require("express");
const router = express.Router();
const { verifyToken, allowedRoles } = require("../../middleware/auth");
const {
  postDepartment,
  getDepartments,
  deleteDepartment,
  updateDepartment
} = require("../../controllers/departmentController");

// Create department by Super & Admin
router.post("/", verifyToken, allowedRoles("SuperAdmin", "Admin"), postDepartment);

// Get departments by Super & Admin with pagination and filters
router.get("/all", verifyToken, allowedRoles("SuperAdmin", "Admin"), getDepartments);

// Update departments by Super & Admin
router.put("/edit/:id", verifyToken, allowedRoles("SuperAdmin", "Admin"), updateDepartment);

// Delete department by Super & Admin
router.delete("/:id", verifyToken, allowedRoles("SuperAdmin", "Admin"), deleteDepartment);

module.exports = router;
