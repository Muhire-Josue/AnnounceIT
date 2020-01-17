import jwt from 'jsonwebtoken';
import failureResponse from '../Helpers/failureResponse';

const auth = (req, res, next) => {
  const bearerHeader = req.headers.authorization;
  if (bearerHeader === undefined) {
    return failureResponse(res, 401, 'Unauthorized access');
  }
  const bearer = bearerHeader.split(' ');
  const bearerToken = bearer[1];
  req.token = bearerToken;
  return jwt.verify(req.token, process.env.API_SERCRET_KEY, (error, data) => {
    if (error) {
      return failureResponse(res, 401, 'Invalid token');
    }
    req.user = data;
    return next();
  });
};

export default auth;
