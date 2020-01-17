/* eslint-disable max-len */
import hash from 'bcrypt-nodejs';
import createUser from '../Helpers/createUser';
import userTokenGenerator from '../Helpers/userTokenGenerator';
import successResponse from '../Helpers/successResponse';

class userController {
  static welcomeToAPI(req, res) {
    return res.status(200).json({ status: 200, message: 'Welcome to this API enjoy!' });
  }

  static signUp(req, res) {
    const user = req.body;
    user.password = hash.hashSync(user.password);
    createUser(user);
    const tokenData = {
      firstname: user.firstname, lastname: user.lastname, email: user.email, is_admin: user.is_admin,
    };
    const token = userTokenGenerator(tokenData);
    const data = {
      token, firstname: user.firstname, lastname: user.lastname, email: user.email, phoneNumber: user.phoneNumer, address: user.address, is_admin: user.is_admin,
    };
    successResponse(res, 201, 'User created successfully!', data);
  }
}
export default userController;
