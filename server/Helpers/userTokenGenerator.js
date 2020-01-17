import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const tokenGenerator = (data) => {
  const token = jwt.sign(data, process.env.API_SERCRET_KEY);
  return token;
};
export default tokenGenerator;
