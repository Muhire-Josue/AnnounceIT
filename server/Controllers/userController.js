class userController {
  static welcomeToAPI(req, res) {
    return res.status(200).json({ status: 200, message: 'Welcome to this API enjoy!' });
  }
}
export default userController;
