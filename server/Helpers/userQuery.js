import User from '../Models/user';

class UserQuery {
  static createUser(data) {
    return User.push(data);
  }

  static findByEmail(email) {
    return User.find(u => u.email === email);
  }
}
export default UserQuery;
