import query from '../Helpers/announcementQuery';
import response from '../Helpers/response';

const duplication = async (req, res, next) => {
  const announcementFound = await query.findByText(req.body.text);
  if (announcementFound) {
    return response.failureResponse(res, 409, 'Announcement already exists');
  }
  return next();
};
export default duplication;
