import findByEmail from '../Helpers/findByEmail';
import failureResponse from '../Helpers/failureResponse';

const userDuplication = (req, res, next) => {
  const duplicatedUser = findByEmail(req.body.email);
  if (duplicatedUser) {
    return failureResponse(res, 409, 'Email already exists');
  }
  return next();
};
export default userDuplication;
