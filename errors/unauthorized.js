class UnauthorizedError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 401;
    errorlogger.error(
      'Not authorized to access. Try again with correct credientials. (401 error)',
    );
  }
}

module.exports = UnauthorizedError;
