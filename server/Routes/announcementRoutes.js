/* eslint-disable eol-last */
import express from 'express';
import authentication from '../Middlewares/authentication';
import announcementController from '../Controllers/announcementController';
import validation from '../Middlewares/validation';
import duplication from '../Middlewares/duplication';
import notFound from '../Middlewares/announcementNotFound';
import authorization from '../Middlewares/authorization';

const router = express.Router();
router.post('/api/v1/announcement', authentication, validation, duplication, announcementController.create);
router.patch('/api/v1/announcement/:id', authentication, notFound, authorization, announcementController.update);
router.get('/api/v1/announcement', authentication, announcementController.all);
router.get('/api/v1/announcements', authentication, announcementController.findByStatus);
router.get('/api/v1/announcement/:id', authentication, notFound, authorization, announcementController.getAnnouncement);
router.delete('/api/v1/announcement/:id', authentication, notFound, authorization, announcementController.delete);
export default router;