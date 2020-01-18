/* eslint-disable radix */
import findById from '../Helpers/findById';
import failureResponse from '../Helpers/failureResponse';

const authorization = (req, res, next) => {
  const announcement = findById(parseInt(req.params.id));
  const currentUser = req.user;
  if (announcement.owner !== currentUser.id) {
    return failureResponse(res, 401, 'Unauthorized access');
  }
  return next();
};
export default authorization;
