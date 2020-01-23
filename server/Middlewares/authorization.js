/* eslint-disable radix */
import query from '../Helpers/announcementQuery';
import response from '../Helpers/response';

const authorization = (req, res, next) => {
  const announcement = query.findById(parseInt(req.params.id));
  const currentUser = req.user;
  if (announcement.id !== currentUser.id) {
    return response.failureResponse(res, 401, 'Unauthorized access');
  }
  return next();
};
export default authorization;
