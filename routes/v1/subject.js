const express = require("express");
const router = express.Router();
const { verifyToken, allowedRoles } = require("../../middleware/auth");
const {
  postSubject,
  getSubjects,
  deleteSubject,
  updateSubject,
  uploadSubjectFile,
  removeSubjectFile,
  uploadLocalSubjectFile,
  removeLocalSubjectFile,
} = require("../../controllers/subjectController");
const { upload } = require("../../middleware/uploadLocal");
const { uploadMemory } = require("../../middleware/uploadCloud");

// Create subject by Super & Admin
router.post("/", verifyToken, allowedRoles("SuperAdmin", "Admin"), postSubject);

// Get subjects by Super & Admin with pagination and filters
router.get(
  "/all",
  verifyToken,
  allowedRoles("SuperAdmin", "Admin"),
  getSubjects
);

// Update subject by Super & Admin
router.put(
  "/edit/:id",
  verifyToken,
  allowedRoles("SuperAdmin", "Admin"),
  updateSubject
);

// Delete subject by Super & Admin
router.delete(
  "/:id",
  verifyToken,
  allowedRoles("SuperAdmin", "Admin"),
  deleteSubject
);

// upload subject file on cloud server by Super & Admin
router.put(
  "/upload-file/:id",
  verifyToken,
  allowedRoles("SuperAdmin", "Admin"),
  uploadMemory.single("fileUrl"),
  uploadSubjectFile
);

// delete subject file on cloud server by Super & Admin
router.delete(
  "/remove-file/:id",
  verifyToken,
  allowedRoles("SuperAdmin", "Admin"),
  removeSubjectFile
);

// upload subject file in local server by Super & Admin
router.put(
  "/upload-file-local/:id",
  verifyToken,
  allowedRoles("SuperAdmin", "Admin"),
  upload.single("fileUrl"),
  uploadLocalSubjectFile
);

// delete subject file in local server by Super & Admin
router.delete(
  "/remove-file-local/:id",
  verifyToken,
  allowedRoles("SuperAdmin", "Admin"),
  removeLocalSubjectFile
);

module.exports = router;
