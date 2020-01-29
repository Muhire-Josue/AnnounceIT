/* eslint-disable eol-last */
import express from 'express';
import userController from '../Controllers/userController';
import userValidation from '../Middlewares/userValidation';
import userDuplication from '../Middlewares/userDuplication';
import userFound from '../Middlewares/userFound';
import incorrectPassword from '../Middlewares/incorrectPassword';

const router = express.Router();
router.get('/api/v2/', userController.welcomeToAPI);
router.post('/api/v2/auth/signup', userValidation, userDuplication, userController.signUp);
router.post('/api/v1/auth/signin', userFound, incorrectPassword, userController.login);
export default router;