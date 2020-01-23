class Response {
  static successResponse(response, status, message, data) {
    response.status(status)
      .json({
        status,
        message,
        data,
      });
  }

  static failureResponse(response, status, error) {
    response.status(status)
      .json({
        status,
        error,
      });
  }

  static deleteResponse(response, status, message) {
    response.status(status)
      .json({
        status,
        message,
      });
  }
}
export default Response;
