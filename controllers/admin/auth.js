const { registerSchema, loginSchema } = require("../../utils/validationsSchema");
const {
  createAdmin,
  adminVerification,
  generateToken,
} = require("../../services/adminAuthService");

// Register Admin by Super Admin
const registerAdmin = async (req, res, next) => {
  try {
    const { error } = registerSchema.validate(req.body);
    if (error) {
      return res
        .status(400)
        .json({ message: error?.details?.map((val) => val.message) });
    }

    const newAdmin = await createAdmin(req.body, next);

    const obj = {
      id: newAdmin?._id,
      name: newAdmin?.name,
      email: newAdmin?.email,
      role: newAdmin?.role,
    };

    res
      .status(201)
      .json({ message: "Admin registered successfully", data: obj });
  } catch (error) {
    next(error);
  }
};

// Login admin or super admin
const loginAdmin = async (req, res, next) => {
  try {
    const { error } = loginSchema.validate(req.body);
    if (error) {
      return res
        .status(400)
        .json({ message: error?.details?.map((val) => val.message) });
    }

    const admin = await adminVerification(req.body, next);
    const token = generateToken({
      id: admin._id,
      role: admin.role,
      email: admin.email,
    });

    res.json({ token, role: admin.role });
  } catch (error) {
    next(error);
    // if (error.name === "CastError") {
    //   res.status(400).json({ message: `Invalid ID format: ${error?.message}` });
    // } else if (error.name === "ValidationError") {
    //   for (let field in error.errors) {
    //     res
    //       .status(400)
    //       .json({ message: `${field}: ${error.errors[field].message}` });
    //   }
    // } else {
    //   res.status(500).json({ message: "Server error", error });
    // }
  }
};

module.exports = { registerAdmin, loginAdmin };
