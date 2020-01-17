const successResponse = (response, status, message, data) => (
  response.status(status)
    .json({
      status,
      message,
      data,
    })
);
export default successResponse;
