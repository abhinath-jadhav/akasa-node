class SuccessResonse {
  constructor(statusCode, message = "Success", data = []) {
    this.status = statusCode;
    this.data = data;
    this.message = message;
    this.success = statusCode < 400;
  }
}

module.exports = SuccessResonse;
