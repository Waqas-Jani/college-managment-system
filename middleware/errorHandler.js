const errorHandler = (err, req, res, next) => {
  let statusCode = err.statusCode || 500;
  let message = err.message || "Internal Server Error";

  // Handle Mongoose validation errors
  if (err.name === "CastError") {
    statusCode = 400;
    message = `Invalid ID format: ${err?.message}`;
  } else if (err.name === "ValidationError") {
    statusCode = 400;
    message = Object.values(err.errors)
      .map((val) => val.message)
      .join(", ");
  } // Handle duplicate key errors (e.g., unique constraints)
  else if (err.code === 11000) {
    statusCode = 400;
    message = `Duplicate key error: ${JSON.stringify(err.keyValue)}`;
  }

  res.status(statusCode).json({
    message,
    stack: process.env.NODE_ENV === "production" ? null : err.stack,
  });
};

module.exports = errorHandler;
