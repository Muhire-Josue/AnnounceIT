/* eslint-disable radix */
import response from '../Helpers/response';

const checkId = (req, res, next) => {
  const id = parseInt(req.params.id);
  if (!Number.isInteger(id)) {
    return response.failureResponse(res, 400, 'Please provide a valid id');
  }
  return next();
};
export default checkId;
