const Subject = require("../models/subject");
const CustomError = require("../utils/customErros");
const { simplePagination } = require("../utils/pagination");
const fs = require("fs");
const path = require("path");
const { bufferToStream, cloudinary } = require("../middleware/uploadCloud");

// create subject
const createSubject = async (data) => {
  const isCodeExist = await Subject.findOne({ code: data.code });
  if (isCodeExist) {
    throw new CustomError("Subject code already exist.", 409);
  }
  const subject = new Subject(data);
  await subject.save();
  return subject;
};

// find subject with pagination and filter
const findSubjects = async ({ limit, page, query, populateOptions, sortBy }) => {
  const subjects = await simplePagination(
    Subject,
    Number(page),
    Number(limit),
    query,
    populateOptions,
    sortBy
  );

  return subjects;
};

// update subject by id
const updateSubjectById = async (id, data) => {
  //   check if name exist then check duplicates and update safely
  if (data.code) {
    const subject = await Subject.findById(id);

    if (!subject) {
      throw new CustomError(`Record with ID ${id} not found. `, 404);
    }
    if (data.code !== subject.code) {
      const isCodeExist = await Subject.findOne({ code: data.code });

      if (isCodeExist) {
        throw new CustomError("Subject code already exists.", 409);
      }
    }
  }
  // if name not change then bypass the if statement and find & update
  const updated = await Subject.findByIdAndUpdate(id, { $set: data }, { new: true });
  if (!updated) {
    throw new CustomError(`Record with ID ${id} not found. `, 404);
  }
  return updated;
};

// delete subject by id
const deleteSubjectById = async (id) => {
  const deleted = await Subject.findByIdAndDelete(id);
  if (!deleted) {
    throw new CustomError("Subject not found or already removed.", 404);
  }
  return deleted;
};

// upload file on cloud server by id
const uploadFileById = async (id, file) => {
  const subject = await Subject.findById(id);
  if (!subject) {
    throw new CustomError(`Record with ID ${id} not found.`, 404);
  }

  const resourceType = file?.mimetype === "application/pdf" ? "raw" : "auto";

  const fileStream = bufferToStream(file.buffer);
  const uploadPromise = await new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: "college-managment",
        resource_type: resourceType,
        format: resourceType === "raw" ? "pdf" : undefined
      },
      (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      }
    );

    fileStream.pipe(uploadStream); // pipe the stream directly
  });
  subject.fileUrl = uploadPromise.secure_url;
  return await subject.save();
};

// upload file on cloud server by id
const removeFileById = async (id) => {
  const subject = await Subject.findById(id);
  if (!subject) {
    throw new CustomError(`Record with ID ${id} not found.`, 404);
  }

  const imageUrl = subject.fileUrl;

  if (imageUrl) {
    return new Promise((resolve, reject) => {
      // Extract Cloudinary Public ID from URL
      const fileName = imageUrl.split("/").pop().split(".");
      const publicId = fileName[1] === "pdf" ? fileName.join(".") : fileName[0]; // Extract ID
      const resourceType = fileName[1] === "pdf" ? "raw" : "image"; // Extract Type
      cloudinary.uploader.destroy(
        `college-managment/${publicId}`,
        { resource_type: resourceType },
        async (error, result) => {
          if (error) return reject(new CustomError(error.message, 400));
          if (result?.result === "ok") {
            subject.fileUrl = null;
            await subject.save();
            resolve("ok");
          } else {
            return reject(new CustomError(`File not found or already removed.`, 404));
          }
        }
      );
    });
    // Delete from cloudinary
  } else {
    throw new CustomError(`File not found or already removed.`, 404);
  }
};

// upload subject file local server by id
const uploadFileLocalById = async (id, file) => {
  const subject = await Subject.findById(id);
  if (!subject) {
    if (file) {
      fs.unlinkSync(file.path);
    }
    throw new CustomError(`Record with ID ${id} not found. `, 404);
  }

  subject.fileUrl = `/uploads/${file.filename}`;
  return await subject.save();
};

// remove fie in local server by id
const removedLocalSubjectFileById = async (id) => {
  const subject = await Subject.findById(id);
  if (!subject) {
    throw new CustomError(`Record with ID ${id} not found. `, 404);
  }

  // remove file from server
  if (subject.fileUrl) {
    const filePath = path.join(__dirname, "..", subject.fileUrl);
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }
    subject.fileUrl = null;
    await subject.save();
  }
};

module.exports = {
  createSubject,
  findSubjects,
  updateSubjectById,
  deleteSubjectById,
  uploadFileById,
  removeFileById,
  uploadFileLocalById,
  removedLocalSubjectFileById
};
