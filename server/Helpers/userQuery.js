import hash from 'bcrypt-nodejs';
import db from '../Models/index';
import User from '../Models/user';

class UserQuery {
  static async createUser(data) {
    const {
      firstName, lastName, email, phoneNumber, password, address, isAdmin,
    } = data;
    const text = `INSERT INTO
      users("firstName", "lastName", email, "phoneNumber", password, address, "isAdmin")
      VALUES($1, $2, $3, $4, $5, $6, $7)
      returning id, "firstName", "lastName", email, "phoneNumber", password, address, "isAdmin", "createdDate"`;

    const values = [
      firstName, lastName, email, phoneNumber, hash.hashSync(password), address, isAdmin];
    const { rows } = await db.query(text, values);
    return rows[0];
  }

  static async getByEmail(email) {
    const { rows } = await db.query('SELECT * FROM users WHERE email=$1', [email]);
    return rows[0];
  }

  static findByEmail(email) {
    return User.find(u => u.email === email);
  }
}
export default UserQuery;
