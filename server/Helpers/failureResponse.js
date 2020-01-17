const failureResponse = (response, status, error) => (
  response.status(status)
    .json({
      status,
      error,
    })
);
export default failureResponse;
