/* eslint-disable radix */
import query from '../Helpers/announcementQuery';
import response from '../Helpers/response';

const authorization = async (req, res, next) => {
  const announcement = await query.findById(parseInt(req.params.id));
  const currentUser = req.user;
  if (announcement.userId !== currentUser.id) {
    return response.failureResponse(res, 401, 'Unauthorized access');
  }
  return next();
};
export default authorization;
