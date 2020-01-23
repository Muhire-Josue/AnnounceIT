/* eslint-disable max-len */
import hash from 'bcrypt-nodejs';
import userTokenGenerator from '../Helpers/userTokenGenerator';
import User from '../Models/user';
import query from '../Helpers/userQuery';
import response from '../Helpers/response';

class UserController {
  static welcomeToAPI(req, res) {
    return res.status(200).json({ status: 200, message: 'Welcome to this API enjoy!' });
  }

  static signUp(req, res) {
    const user = req.body;
    user.password = hash.hashSync(user.password);
    user.id = User.length + 1;
    query.createUser(user);
    const tokenData = {
      id: user.id, firstname: user.firstname, lastname: user.lastname, email: user.email, is_admin: user.is_admin,
    };
    const token = userTokenGenerator(tokenData);
    const data = {
      token, id: user.id, firstname: user.firstname, lastname: user.lastname, email: user.email, phoneNumber: user.phoneNumber, address: user.address, is_admin: user.is_admin,
    };
    response.successResponse(res, 201, 'User created successfully', data);
  }

  static login(req, res) {
    const user = query.findByEmail(req.body.email);
    const tokenData = {
      id: user.id, firstname: user.firstname, lastname: user.lastname, email: user.email, is_admin: user.is_admin,
    };
    const token = userTokenGenerator(tokenData);
    const data = {
      token, id: user.id, firstname: user.firstname, lastname: user.lastname, email: user.email, phoneNumber: user.phoneNumber, address: user.address, is_admin: user.is_admin,
    };
    response.successResponse(res, 200, 'Logged in successfully', data);
  }
}
export default UserController;
