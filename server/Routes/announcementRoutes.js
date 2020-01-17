/* eslint-disable eol-last */
import express from 'express';
import authentication from '../Middlewares/authentication';
import announcementControlleruleName from '../Controllers/announcementController';
import validation from '../Middlewares/validation';
import duplication from '../Middlewares/duplication';

const router = express.Router();
router.post('/api/v1/announcement', authentication, validation, duplication, announcementControlleruleName.create);
export default router;