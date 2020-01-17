import Joi from '@hapi/joi';

const userSchema = Joi.object().keys({
  firstname: Joi.string().regex(/^[a-zA-Z]{3,30}$/).min(3).max(30)
    .required(),
  lastname: Joi.string().regex(/^[a-zA-Z]{3,30}$/).min(3).max(30)
    .required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(3).required(),
  phoneNumer: Joi.string().min(10).required(),
  address: Joi.string().min(3).required(),
  is_admin: Joi.boolean().valid([false, true]),
});

export default userSchema;
