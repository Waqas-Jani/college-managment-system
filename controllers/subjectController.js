const {
  subjectSchema,
  optionalSubjectSchema,
} = require("../utils/validationsSchema");

const {
  createSubject,
  findSubjects,
  deleteSubjectById,
  updateSubjectById,
  uploadFileById,
  removeFileById,
  uploadFileLocalById,
  removedLocalSubjectFileById,
} = require("../services/subjectService");

// get all department with pagination
const getSubjects = async (req, res, next) => {
  /* 
    d_ref => department reference
    at_ref => attendance reference
    as_ref => assignment reference 
*/
  const { limit, page, name, d_ref, at_ref, as_ref, sort_by } = req.query;
  let populateOptions = [];
  let query = {};
  if (d_ref) populateOptions.push({ path: "department", select: "name" });
  if (at_ref) populateOptions.push("attendanceRecords");
  if (as_ref) populateOptions.push({ path: "assignments", select: "title" });

  if (name) {
    query.name = { $regex: name, $options: "i" }; // Case-insensitive search
  }

  try {
    const departments = await findSubjects({
      limit,
      page,
      query,
      populateOptions,
      sort_by,
    });
    res.status(200).json(departments);
  } catch (error) {
    next(error);
  }
};

// create the department
const postSubject = async (req, res, next) => {
  try {
    const { error } = subjectSchema.validate(req.body);

    if (error) {
      return res
        .status(400)
        .json({ message: error?.details?.map((val) => val.message) });
    }

    const subject = await createSubject(req.body);

    res
      .status(201)
      .json({ message: "Subject created successfully.", data: subject });
  } catch (error) {
    next(error);
  }
};

// update department by id
const updateSubject = async (req, res, next) => {
  const { id } = req.params;
  try {
    const { error } = optionalSubjectSchema.validate(req.body);
    if (error) {
      return res
        .status(400)
        .json({ message: error?.details.map((val) => val.message) });
    }
    const updated = await updateSubjectById(id, req.body);
    res
      .status(200)
      .json({ message: "Subject updated successfully.", data: updated });
  } catch (error) {
    next(error);
  }
};

// delete the department by id
const deleteSubject = async (req, res, next) => {
  const { id } = req.params;

  try {
    await deleteSubjectById(id);

    res.status(200).json({ message: "Subject removed successfully." });
  } catch (error) {
    next(error);
  }
};

// upload subject file by id
const uploadSubjectFile = async (req, res, next) => {
  const { id } = req.params;
  const file = req.file;

  try {
    if (!file) {
      return res.status(400).json({ message: "No file uploaded!" });
    }
    const uploaded = await uploadFileById(id, file);

    res
      .status(200)
      .json({ message: "Subject file uploaded successfully.", data: uploaded });
  } catch (error) {
    next(error);
  }
};

// remove subject file by id
const removeSubjectFile = async (req, res, next) => {
  const { id } = req.params;
  try {
    await removeFileById(id);
    res.status(200).json({ message: "Subject file removed successfully." });
  } catch (error) {
    next(error);
  }
};

// upload subject file in local server by id
const uploadLocalSubjectFile = async (req, res, next) => {
  const { id } = req.params;
  const file = req.file;

  try {
    if (!file) {
      return res.status(400).json({ message: "No file uploaded!" });
    }
    const uploaded = await uploadFileLocalById(id, file);
    res
      .status(200)
      .json({ message: "Subject file uploaded successfully.", data: uploaded });
  } catch (error) {
    next(error);
  }
};

// remove subject file in local server by id
const removeLocalSubjectFile = async (req, res, next) => {
  const { id } = req.params;
  try {
    await removedLocalSubjectFileById(id);
    res.status(200).json({ message: "Subject file removed successfully." });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  postSubject,
  getSubjects,
  updateSubject,
  deleteSubject,
  uploadSubjectFile,
  removeSubjectFile,
  uploadLocalSubjectFile,
  removeLocalSubjectFile,
};
