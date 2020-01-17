/* eslint-disable no-param-reassign */
import User from '../Models/user';

const createUser = (data) => {
  data.id = User.length + 1;
  User.push(data);
};
export default createUser;
