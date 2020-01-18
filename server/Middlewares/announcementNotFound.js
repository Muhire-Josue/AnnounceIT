/* eslint-disable radix */
import failureResponse from '../Helpers/failureResponse';
import findById from '../Helpers/findById';

const notFound = (req, res, next) => {
  const found = findById(parseInt(req.params.id));
  if (!found) {
    return failureResponse(res, 404, 'Announcement not found');
  }
  return next();
};
export default notFound;
