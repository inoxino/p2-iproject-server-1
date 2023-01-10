const errorHandler = (err, req, res, next) => {
  let code = 500;
  let message = "Internal Server Error";

  if (err.name === "SequelizeValidationError" || err.name === "SequelizeUniqueConstraintError") {
    code = 400;
    message = err.errors[0].message;
  } else if (err.name === "invalidLogin") {
    code = 401;
    message = "Wrong Email or Password";
  } else if (err.name === "invalid_token" || err.name === "JsonWebTokenError") {
    code = 401;
    message = "Invalid Token";
  }

  res.status(code).json({ message });
};

module.exports = errorHandler;
