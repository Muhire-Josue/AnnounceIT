/* eslint-disable max-len */
import userTokenGenerator from '../Helpers/userTokenGenerator';
import query from '../Helpers/userQuery';
import response from '../Helpers/response';

class UserController {
  static welcomeToAPI(req, res) {
    return res.status(200).json({ status: 200, message: 'Welcome to this API enjoy!' });
  }

  static async signUp(req, res) {
    const newUser = req.body;
    const user = await query.createUser(newUser);
    const tokenData = {
      id: user.id, firstName: user.firstName, lastName: user.lastName, email: user.email, isAdmin: user.isAdmin,
    };
    const token = userTokenGenerator(tokenData);
    const data = {
      token, id: user.id, firstName: user.firstName, lastName: user.lastName, email: user.email, phoneNumber: user.phoneNumber, address: user.address, isAdmin: user.isAdmin,
    };
    response.successResponse(res, 201, 'User created successfully', data);
  }

  static async login(req, res) {
    const user = await query.findByEmail(req.body.email);
    const tokenData = {
      id: user.id, firstName: user.firstName, lastName: user.lastName, email: user.email, isAdmin: user.isAdmin,
    };
    const token = userTokenGenerator(tokenData);
    const data = {
      token, id: user.id, firstName: user.firstName, lastName: user.lastName, email: user.email, phoneNumber: user.phoneNumber, address: user.address, isAdmin: user.isAdmin,
    };
    response.successResponse(res, 200, 'User logged in successfully', data);
  }
}
export default UserController;
