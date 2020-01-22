import response from '../Helpers/response';

const checkAdmin = (req, res, next) => {
  const currentUser = req.user;
  if (!currentUser.is_admin) {
    return response.failureResponse(res, 403, 'Forbidden operation');
  }
  return next();
};
export default checkAdmin;
