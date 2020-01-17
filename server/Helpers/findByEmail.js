import User from '../Models/user';

const findByEmail = email => User.find(u => u.email === email);
export default findByEmail;
