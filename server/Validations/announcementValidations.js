import Joi from '@hapi/joi';

const announcementSchema = Joi.object().keys({
  text: Joi.string().min(2).trim().required(),
  endDate: Joi.date().iso().required(),
});

export default announcementSchema;
