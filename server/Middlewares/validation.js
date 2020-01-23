/* eslint-disable camelcase */
import announcementSchema from '../Validations/announcementValidations';
import response from '../Helpers/response';

const validate = (req, res, next) => {
  const announcement = req.body;
  const { text, end_date } = announcement;
  const validateUser = announcementSchema.validate({ text, end_date });
  if (validateUser.error) {
    return response.failureResponse(res, 400, validateUser.error.details[0].message);
  }
  return next();
};
export default validate;
