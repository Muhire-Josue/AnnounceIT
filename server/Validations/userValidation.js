/* eslint-disable no-param-reassign */
import Joi from '@hapi/joi';

const userSchema = Joi.object().keys({
  firstName: Joi.string().trim(true).regex(/^[a-zA-Z]{3,30}$/).min(3)
    .max(30)
    .required()
    .error((errors) => {
      errors.forEach((err) => {
        if (err.type === 'any.empty') { err.message = 'First name should not be empty!'; }
        if (err.type === 'any.required') { err.message = 'First name is required!'; }
        if (err.type === 'string.base') { err.message = 'First name should be a string of characters!'; }
        if (err.type === 'string.regex.base') { err.message = 'Characters should be between 3-30'; }
      });
      return errors;
    }),
  lastName: Joi.string().trim(true).regex(/^[a-zA-Z]{3,30}$/).min(3)
    .max(30)
    .required()
    .error((errors) => {
      errors.forEach((err) => {
        if (err.type === 'any.empty') { err.message = 'Last name should not be empty!'; }
        if (err.type === 'any.required') { err.message = 'Last name is required!'; }
        if (err.type === 'string.base') { err.message = 'Last name should be a string of characters!'; }
        if (err.type === 'string.regex.base') { err.message = 'Characters should be between 3-30'; }
      });
      return errors;
    }),
  email: Joi.string().email().required()
    .error((errors) => {
      errors.forEach((err) => {
        if (err.type === 'any.empty') { err.message = 'Email should not be empty!'; }
        if (err.type === 'any.required') { err.message = 'Email is required!'; }
        if (err.type === 'string.base') { err.message = 'Email should be a string of characters!'; }
        if (err.type === 'string.email') { err.message = 'Please provide a valid email!'; }
      });
      return errors;
    }),
  password: Joi.string().regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/).required().options({ language: { string: { regex: { base: 'must be an alphanumeric with uppercase and the length not less than 8!' } } } }),
  phoneNumber: Joi.string()
    .required()
    .trim()
    .regex(/((\(\d{3}\) ?)|(\d{3}-))?\d{3}-\d{4}/)
    .error((errors) => {
      errors.forEach((err) => {
        if (err.type === 'any.empty') { err.message = 'Email should not be empty!'; }
        if (err.type === 'any.required') { err.message = 'Email is required!'; }
        if (err.type === 'string.base') { err.message = 'Email should be a string of characters!'; }
        if (err.type === 'string.regex.base') { err.message = 'Please provide a valid phone number'; }
      });
      return errors;
    }),
  address: Joi.string().trim(true).min(3).required(),
  isAdmin: Joi.boolean().valid([false, true]),
});

export default userSchema;
