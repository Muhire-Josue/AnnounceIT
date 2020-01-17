/* eslint-disable eol-last */
import express from 'express';
import userController from '../Controllers/userController';

const router = express.Router();
router.get('/api/v1/', userController.welcomeToAPI);

export default router;