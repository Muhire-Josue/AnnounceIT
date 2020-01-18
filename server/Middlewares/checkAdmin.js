import failureResponse from '../Helpers/failureResponse';

const checkAdmin = (req, res, next) => {
  const currentUser = req.user;
  if (!currentUser.is_admin) {
    return failureResponse(res, 403, 'Forbidden operation');
  }
  return next();
};
export default checkAdmin;
