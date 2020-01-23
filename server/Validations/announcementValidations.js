import Joi from '@hapi/joi';

const announcementSchema = Joi.object().keys({
  text: Joi.string().min(2).required(),
  end_date: Joi.date().iso().required(),
});

export default announcementSchema;
