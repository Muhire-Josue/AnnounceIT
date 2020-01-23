import query from '../Helpers/userQuery';
import response from '../Helpers/response';

const userFound = (req, res, next) => {
  const user = query.findByEmail(req.body.email);
  if (!user) {
    return response.failureResponse(res, 404, 'User not found');
  }
  return next();
};
export default userFound;
