import query from '../Helpers/userQuery';
import response from '../Helpers/response';

const userFound = async (req, res, next) => {
  const user = await query.findByEmail(req.body.email);
  if (!user) {
    return response.failureResponse(res, 404, 'User not found');
  }
  return next();
};
export default userFound;
