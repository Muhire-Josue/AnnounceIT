import query from '../Helpers/userQuery';
import response from '../Helpers/response';

const userDuplication = (req, res, next) => {
  const duplicatedUser = query.findByEmail(req.body.email);
  if (duplicatedUser) {
    return response.failureResponse(res, 409, 'Email already exists');
  }
  return next();
};
export default userDuplication;
