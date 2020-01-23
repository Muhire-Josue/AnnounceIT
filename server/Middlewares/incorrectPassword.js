import hash from 'bcrypt-nodejs';
import query from '../Helpers/userQuery';
import response from '../Helpers/response';

const incorrectPassword = (req, res, next) => {
  const user = query.findByEmail(req.body.email);
  const comparePassword = hash.compareSync(req.body.password, user.password);
  if (!comparePassword) {
    return response.failureResponse(res, 400, 'Password do not match');
  }
  return next();
};
export default incorrectPassword;
