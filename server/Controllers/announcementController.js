/* eslint-disable radix */
import createAnnouncement from '../Helpers/createAnnouncement';
import successResponse from '../Helpers/successResponse';
import failureResponse from '../Helpers/failureResponse';
import deleteResponse from '../Helpers/deleteResponse';
import updateAnnouncement from '../Helpers/updateAnnouncement';
import findAllAnnouncements from '../Helpers/findAllAnnouncements';
import findAnnouncementByStatus from '../Helpers/findByStatus';
import findById from '../Helpers/findById';
import validStatus from '../Helpers/validateStatus';
import deleteAnnouncement from '../Helpers/delete';
import changeStatus from '../Helpers/changeStatus';
import Announcement from '../Models/announcement';

class AnnouncementController {
  static create(req, res) {
    const announcement = req.body;
    const UserId = parseInt(req.user.id);
    createAnnouncement(announcement, UserId);
    return successResponse(res, 201, 'success', announcement);
  }

  static update(req, res) {
    const updatedAnnouncement = updateAnnouncement(req.params.id, req.body);
    return successResponse(res, 200, 'success', updatedAnnouncement);
  }

  static all(req, res) {
    const owner = parseInt(req.user.id);
    const announcements = findAllAnnouncements(owner);
    return successResponse(res, 200, 'success', announcements);
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

  static getAnnouncement(req, res) {
    const id = parseInt(req.params.id);
    const announcement = findById(id);
    return successResponse(res, 200, 'success', announcement);
  }

  static delete(req, res) {
    const id = parseInt(req.params.id);
    deleteAnnouncement(id);
    return deleteResponse(res, 200, 'success');
  }

  static changeStatus(req, res) {
    const id = parseInt(req.params.id);
    const theStatus = req.query.status;
    const announcement = changeStatus(id, theStatus);
    return successResponse(res, 200, 'success', announcement);
  }

  static allAnnouncements(req, res) {
    return successResponse(res, 200, 'success', Announcement);
  }
}
export default AnnouncementController;
