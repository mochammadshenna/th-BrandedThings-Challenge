function errorHandler(err, req, res, next) {
    let status;
    let message;
    let name;
    if (err.name == "SequelizeValidationError") {
        name = "Input Validation Error";
        status = 400;
        let errorList = err.errors.map((err) => err.message);
        message = errorList[0];
    } else if (err.name == "File Type Error") {
        name = "File Type Error";
        status = 400;
        message = err.message;
    } else if (err.name == "File Size Error") {
        name = "File Size Error";
        status = 400;
        message = err.message;
    } else if (err.name == "REGISTERED_AS_EMPLOYEE") {
        name = "REGISTERED_AS_EMPLOYEE";
        status = 400;
        message = err.message;
    } else if (err.name == "Bad Request") {
        name = "Bad Request";
        status = 400;
        message = err.message;
    } else if (err.name == "SequelizeUniqueConstraintError") {
        name = "Input Unique Constraint Error";
        status = 400;
        let errorList = err.errors.map((err) => err.message);
        message = errorList[0];
    } else if (err.name == "INVALID_LOGIN") {
        name = "Invalid Login Error";
        status = 401;
        message = "Invalid email or password";
    } else if (err.name == "JsonWebTokenError") {
        name = "Authentication Error";
        status = 401;
        message = "Please login first";
    } else if (err.name == "FORBIDDEN") {
        name = "Forbidden Error";
        status = 403;
        message = "You are not authorized";
    } else if (err.name == "NOT_CUSTOMER") {
        name = "Forbidden Error";
        status = 403;
        message = "Only customers can access";
    } else if (err.name == "ERROR_NOT_FOUND") {
        name = "Not Found Error";
        status = 404;
        message = err.message;
    } else {
        name = "Internal Server Error";
        status = 500;
        message = err.message;
    }

    res.status(status).json({ name, message });
}

module.exports = errorHandler;
