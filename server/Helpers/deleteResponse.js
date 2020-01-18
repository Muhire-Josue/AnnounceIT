const successResponse = (response, status, message) => (
  response.status(status)
    .json({
      status,
      message,
    })
);
export default successResponse;
