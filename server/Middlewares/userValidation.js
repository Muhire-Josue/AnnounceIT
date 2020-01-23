/* eslint-disable camelcase */
import userSchema from '../Validations/userValidation';
import response from '../Helpers/response';

const validate = (req, res, next) => {
  const user = req.body;
  const {
    firstname, lastname, email, password, phoneNumber, address, is_admin,
  } = user;
  const validateUser = userSchema.validate({
    firstname, lastname, email, password, phoneNumber, address, is_admin,
  });
  if (validateUser.error) {
    return response.failureResponse(res, 400, validateUser.error.details[0].message);
  }
  return next();
};
export default validate;
