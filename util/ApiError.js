class ApiError extends Error {
  constructor(
    statusCode = 500,
    message = "Something went wrong.",
    errors = []
  ) {
    super(message);
    this.statusCode = statusCode;
    this.data = message;
    this.message = message;
    this.success = false;
    this.errors = errors;
  }
}

module.exports = ApiError;
