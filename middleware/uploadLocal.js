const multer = require("multer");
const fs = require("fs");
const CustomError = require("../utils/customErros");

// configure storage to save file/images in local folder
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = "uploads/"; // destination folder
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath);
    }
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`); // unique file name
  },
});

const filterFile = (req, file, cb) => {
  const allowedFileTypes = [
    "image/jpeg",
    "image/png",
    "image/jpg",
    "image/webp",
    "application/pdf",
  ];
  if (allowedFileTypes.includes(file.mimetype)) {
    return cb(null, true);
  } else {
    return cb(
      new CustomError(
        "Invalid file type. Only PNG, JPEG, WEBP and PDF allowed",
        400
      ),
      false
    );
  }
};

// multer upload configuration

const upload = multer({
  storage: storage,
  fileFilter: filterFile,
  limits: { fieldSize: 5 * 1024 * 1024 },
});

module.exports = { upload, filterFile };
