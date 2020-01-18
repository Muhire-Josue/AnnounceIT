/* eslint-disable radix */
import createAnnouncement from '../Helpers/createAnnouncement';
import successResponse from '../Helpers/successResponse';
import updateAnnouncement from '../Helpers/updateAnnouncement';
import findAllAnnouncements from '../Helpers/findAllAnnouncements';
import findAnnouncementByStatus from '../Helpers/findByStatus';
import validStatus from '../Helpers/validateStatus';
import failureResponse from '../Helpers/failureResponse';

class AnnouncementController {
  static create(req, res) {
    const announcement = req.body;
    const UserId = parseInt(req.user.id);
    createAnnouncement(announcement, UserId);
    successResponse(res, 201, 'success', announcement);
  }

  static update(req, res) {
    const updatedAnnouncement = updateAnnouncement(req.params.id, req.body);
    successResponse(res, 200, 'success', updatedAnnouncement);
  }

  static all(req, res) {
    const owner = parseInt(req.user.id);
    const announcements = findAllAnnouncements(owner);
    successResponse(res, 200, 'success', announcements);
  }

  static findByStatus(req, res) {
    const theSatus = req.query.status;
    const owner = parseInt(req.user.id);
    const isValidStatus = validStatus(theSatus);
    if (!isValidStatus) {
      return failureResponse(res, 400, 'Invalid Status');
    }
    const announcements = findAnnouncementByStatus(theSatus, owner);
    return successResponse(res, 200, 'success', announcements);
  }
}
export default AnnouncementController;
