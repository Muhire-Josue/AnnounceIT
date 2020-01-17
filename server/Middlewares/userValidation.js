/* eslint-disable camelcase */
import userSchema from '../Validations/userValidation';
import failureResponse from '../Helpers/failureResponse';

const validate = (req, res, next) => {
  const user = req.body;
  const {
    firstname, lastname, email, password, phoneNumer, address, is_admin,
  } = user;
  const validateUser = userSchema.validate({
    firstname, lastname, email, password, phoneNumer, address, is_admin,
  });
  if (validateUser.error) {
    return failureResponse(res, 400, validateUser.error.details[0].message);
  }
  return next();
};
export default validate;
