/* eslint-disable camelcase */
import userSchema from '../Validations/userValidation';
import response from '../Helpers/response';

const validate = (req, res, next) => {
  const user = req.body;
  const {
    firstName, lastName, email, password, phoneNumber, address, isAdmin,
  } = user;
  const validateUser = userSchema.validate({
    firstName, lastName, email, password, phoneNumber, address, isAdmin,
  });
  if (validateUser.error) {
    return response.failureResponse(res, 400, validateUser.error.details[0].message);
  }
  return next();
};
export default validate;
