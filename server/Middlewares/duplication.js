import findByText from '../Helpers/findByText';
import failureResponse from '../Helpers/failureResponse';

const duplication = (req, res, next) => {
  const announcementFound = findByText(req.body.text);
  if (announcementFound) {
    return failureResponse(res, 409, 'Announcement already exists');
  }
  return next();
};
export default duplication;
