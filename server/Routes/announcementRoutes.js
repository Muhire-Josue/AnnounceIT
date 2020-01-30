/* eslint-disable eol-last */
import express from 'express';
import authentication from '../Middlewares/authentication';
import announcementController from '../Controllers/announcementController';
import validation from '../Middlewares/validation';
import duplication from '../Middlewares/duplication';
import notFound from '../Middlewares/announcementNotFound';
import checkId from '../Middlewares/checkId';
import authorization from '../Middlewares/authorization';
import checkAdmin from '../Middlewares/checkAdmin';

const router = express.Router();
router.post('/api/v2/announcement', authentication, validation, duplication, announcementController.create);
router.patch('/api/v2/announcement/:id', authentication, checkId, notFound, authorization, validation, announcementController.update);
router.get('/api/v2/announcement', authentication, announcementController.all);
router.get('/api/v1/announcements', authentication, announcementController.findByStatus);
router.get('/api/v1/announcement/:id', authentication, checkId, notFound, authorization, announcementController.getAnnouncement);
router.delete('/api/v1/announcement/:id', authentication, checkId, notFound, checkAdmin, announcementController.delete);
router.patch('/api/v1/announcements/:id', authentication, checkId, notFound, checkAdmin, announcementController.changeStatus);
router.get('/api/v1/announcemente/', authentication, checkAdmin, announcementController.allAnnouncements);
export default router;