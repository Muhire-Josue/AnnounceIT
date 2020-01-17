import hash from 'bcrypt-nodejs';
import findByEmail from '../Helpers/findByEmail';
import failureResponse from '../Helpers/failureResponse';

const incorrectPassword = (req, res, next) => {
  const user = findByEmail(req.body.email);
  const comparePassword = hash.compareSync(req.body.password, user.password);
  if (!comparePassword) {
    return failureResponse(res, 400, 'Password do not match');
  }
  return next();
};
export default incorrectPassword;
