require("dotenv").config();
const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const { PassThrough } = require("stream");
const { filterFile } = require("./uploadLocal");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Multer for memory storage (No disk storage)
const storage = multer.memoryStorage();

// initialize/configure multer
const uploadMemory = multer({
  storage: storage,
  fileFilter: filterFile,
  limits: { fieldSize: 5 * 1024 * 1024 },
});

// stream buffer using PassThrough
const bufferToStream = (buffer) => {
  const stream = new PassThrough();
  stream.end(buffer); // Write buffer to stream and end it
  return stream;
};

module.exports = { cloudinary, uploadMemory, bufferToStream };
