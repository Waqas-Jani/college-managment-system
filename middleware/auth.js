const jwt = require("jsonwebtoken");

// only access by super admin tokenx
const verifySuperAdmin = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token)
    return res
      .status(401)
      .json({ message: "Access denied due to unauthorized." });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    if (decoded.role !== "SuperAdmin") {
      return res
        .status(403)
        .json({ message: "Forbidden: Only SuperAdmins allowed" });
    }
    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid token" });
  }
};

// Verify valid token
const verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res
      .status(401)
      .json({ message: "Access denied due to unauthorized." });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.user = decoded;

    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid token!" });
  }
};

// Middleware to check required roles
const allowedRoles = (...roles) => {
  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(403).json({
        message:
          "Forbidden. You don't have permission to access this resource.",
      });
    }
    next();
  };
};

module.exports = {
  verifySuperAdmin,
  verifyToken,
  allowedRoles,
};
