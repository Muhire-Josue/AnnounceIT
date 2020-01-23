import query from '../Helpers/announcementQuery';
import response from '../Helpers/response';

const duplication = (req, res, next) => {
  const announcementFound = query.findByText(req.body.text);
  if (announcementFound) {
    return response.failureResponse(res, 409, 'Announcement already exists');
  }
  return next();
};
export default duplication;
