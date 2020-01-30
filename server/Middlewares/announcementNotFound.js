/* eslint-disable radix */
import response from '../Helpers/response';
import query from '../Helpers/announcementQuery';

const notFound = async (req, res, next) => {
  const found = await query.findById(parseInt(req.params.id));
  if (!found) {
    return response.failureResponse(res, 404, 'Announcement not found');
  }
  return next();
};
export default notFound;
