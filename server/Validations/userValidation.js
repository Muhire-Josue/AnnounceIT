import Joi from '@hapi/joi';

const userSchema = Joi.object().keys({
  firstname: Joi.string().trim(true).regex(/^[a-zA-Z]{3,30}$/).min(3)
    .max(30)
    .required(),
  lastname: Joi.string().trim(true).regex(/^[a-zA-Z]{3,30}$/).min(3)
    .max(30)
    .required(),
  email: Joi.string().trim(true).email().required(),
  password: Joi.string().regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/).required().options({ language: { string: { regex: { base: 'must be an alphanumeric with uppercase and the length not less than 8!' } } } }),
  phoneNumber: Joi.string().trim(true).min(10).required(),
  address: Joi.string().trim(true).min(3).required(),
  is_admin: Joi.boolean().valid([false, true]),
});

export default userSchema;
