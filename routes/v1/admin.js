const express = require("express");
const router = express.Router();
const {
  verifySuperAdmin,
  verifyToken,
  allowedRoles,
} = require("../../middleware/auth");
const { registerAdmin, loginAdmin } = require("../../controllers/admin/auth");
const {
  updateAdminBySuper,
  deleteAdminBySuper,
  updateAdminPassword,
  updateAdminProfile,
  getAllAdmins,
} = require("../../controllers/admin/adminController");

// Register admin by super admin
router.post("/register", verifySuperAdmin, registerAdmin);

// Super admin or admin Login
router.post("/login", loginAdmin);

// Get all admins (Super)
router.get("/all", verifySuperAdmin, getAllAdmins);

// Update admin record by id (Super)
router.put("/edit/by-super/:id", verifySuperAdmin, updateAdminBySuper);

// Delete admin record by id (Super)
router.delete("/:id", verifySuperAdmin, deleteAdminBySuper);

// Change password
router.put(
  "/change-password/:id",
  verifyToken,
  allowedRoles("SuperAdmin", "Admin"),
  updateAdminPassword
);

// Update admin profile
router.put(
  "/edit/:id",
  verifyToken,
  allowedRoles("SuperAdmin", "Admin"),
  updateAdminProfile
);

module.exports = router;
