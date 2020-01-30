import Joi from '@hapi/joi';

const userSchema = Joi.object().keys({
  firstName: Joi.string().trim(true).regex(/^[a-zA-Z]{3,30}$/).min(3)
    .max(30)
    .required(),
  lastName: Joi.string().trim(true).regex(/^[a-zA-Z]{3,30}$/).min(3)
    .max(30)
    .required(),
  email: Joi.string().trim(true).email().required(),
  password: Joi.string().regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/).required().options({ language: { string: { regex: { base: 'must be an alphanumeric with uppercase and the length not less than 8!' } } } }),
  phoneNumber: Joi.string()
    .required()
    .trim()
    .regex(/((\(\d{3}\) ?)|(\d{3}-))?\d{3}-\d{4}/),
  address: Joi.string().trim(true).min(3).required(),
  isAdmin: Joi.boolean().valid([false, true]),
});

export default userSchema;
