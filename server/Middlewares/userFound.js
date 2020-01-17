import findByEmail from '../Helpers/findByEmail';
import failureResponse from '../Helpers/failureResponse';

const userFound = (req, res, next) => {
  const user = findByEmail(req.body.email);
  if (!user) {
    return failureResponse(res, 404, 'User not found');
  }
  return next();
};
export default userFound;
