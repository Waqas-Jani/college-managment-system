const joi = require("joi");

const passwordRegex =
  /(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[@$!%*#?~(&)+=^_-]).{8,16}/;

//   admin registration scheme
exports.registerSchema = joi
  .object({
    name: joi.string().required(),
    email: joi
      .string()
      .email({
        minDomainSegments: 2,
        tlds: { allow: ["com", "net"] },
      })
      .required(),
    password: joi
      .string()
      .pattern(new RegExp(passwordRegex))
      .message(
        "{{#label}} At least one upper case, one lower case, one digit, one special character. Minimum 8 in length"
      )
      .required(),

    confirm_password: joi.ref("password"),
    role: joi.string().valid("Admin"),
  })
  .options({ abortEarly: false });

//   login scheme
exports.loginSchema = joi
  .object({
    email: joi
      .string()
      .email({
        minDomainSegments: 2,
        tlds: { allow: ["com", "net"] },
      })
      .required(),
    password: joi.string().required(),
  })
  .options({ abortEarly: false });

//   admin update by super admin
exports.updateBySuperAdminSchema = joi
  .object({
    name: joi.string(),
    email: joi.string().email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net"] },
    }),
    role: joi.string().valid("Admin"),
  })
  .options({ abortEarly: false });

//   update name by admin
exports.updateProfileSchema = joi.object({
  name: joi.string().required(),
});

//   admin password change by super admin or admin
exports.updatePwdSchema = joi
  .object({
    old_password: joi
      .string()
      .required()
      .pattern(new RegExp(passwordRegex))
      .message(
        "{{#label}} At least one upper case, one lower case, one digit, one special character. Minimum 8 in length"
      ),
    password: joi
      .string()
      .pattern(new RegExp(passwordRegex))
      .message(
        "{{#label}} At least one upper case, one lower case, one digit, one special character. Minimum 8 in length"
      )
      .required(),

    confirm_password: joi.ref("password"),
  })
  .options({ abortEarly: false });

/* =================== Faculty ====================== */

// Create faculty
exports.createfacultySchema = joi
  .object({
    name: joi.string().required(),
    email: joi.string().email().required(),
    password: joi
      .string()
      .pattern(new RegExp(passwordRegex))
      .message(
        "{{#label}} At least one upper case, one lower case, one digit, one special character. Minimum 8 in length"
      )
      .required(),

    confirm_password: joi.ref("password"),
    departments: joi.array().items(joi.string().hex().length(24)).required(),
    updatedBy: joi.string().hex().length(24).required(),
    courses: joi.array().items(joi.string().hex().length(24)).required(),
    role: joi.string().valid("HOD", "Professor", "Non-Teaching"),
  })
  .options({ abortEarly: false });

// update faculty
exports.updatefacultyByAdminSchema = joi
  .object({
    name: joi.string(),
    email: joi.string().email(),
    departments: joi.array().items(joi.string().hex().length(24)),
    courses: joi.array().items(joi.string().hex().length(24)),
    updatedBy: joi.string().hex().length(24).required(),
    role: joi.string().valid("HOD", "Professor", "Non-Teaching"),
  })
  .options({ abortEarly: false });

/* =================== Student ====================== */

// Create
exports.createStudentSchema = joi
  .object({
    name: joi.string().required(),
    email: joi.string().email().required(),
    password: joi.string().min(6).required(),
    department: joi.string().hex().length(24).required(),
    courses: joi.array().items(joi.string().hex().length(24)),
  })
  .options({ abortEarly: false });

//////////////// ===========Deparment================= /////////////////////////////////

// create
exports.departmentSchema = joi
  .object({
    name: joi.string().required(),
    updatedBy: joi.string().hex().length(24).required(),
    faculty: joi.array().items(joi.string().hex().length(24)),
    courses: joi.array().items(joi.string().hex().length(24)).min(1).max(20),
  })
  .options({ abortEarly: false });

//   Using same schema but name is optional because not change everytime.
exports.optionalDepartmentSchema = this.departmentSchema.fork(
  ["name"],
  (schema) => schema.optional()
);
/* ============================ Course ================================ */
// Create
exports.courseSchema = joi
  .object({
    name: joi.string().required(),
    code: joi.string().required(),
    updatedBy: joi.string().hex().length(24).required(),
    department: joi.string().hex().length(24),
    duration: joi.number().required(),
    subjects: joi.array().items(joi.string().hex().length(24)),
  })
  .options({ abortEarly: false });

//   Using same schema but name and code make optional
exports.optionalCourseSchema = this.courseSchema.fork(
  ["name", "code", "duration"],
  (schema) => schema.optional()
);

/* ========================== Subject ================================== */

// Create course
exports.subjectSchema = joi
  .object({
    name: joi.string().required(),
    code: joi.string().required(),
    department: joi.string().hex().length(24),
    attendanceRecords: joi.array().items(joi.string().hex().length(24)),
    assignments: joi.array().items(joi.string().hex().length(24)),
    creditHour: joi.number().required(),
  })
  .options({ abortEarly: false });

// Using same schema but name and code make optional
exports.optionalSubjectSchema = this.subjectSchema.fork(
  ["name", "code", "creditHour"],
  (schema) => schema.optional()
);
