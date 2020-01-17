/* eslint-disable eol-last */
import express from 'express';
import userController from '../Controllers/userController';
import userValidation from '../Middlewares/userValidation';
import userDuplication from '../Middlewares/userDuplication';

const router = express.Router();
router.get('/api/v1/', userController.welcomeToAPI);
router.post('/api/v1/auth/signup', userValidation, userDuplication, userController.signUp);

export default router;