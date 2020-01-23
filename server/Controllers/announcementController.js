/* eslint-disable radix */
import validStatus from '../Helpers/validateStatus';
import Announcement from '../Models/announcement';
import query from '../Helpers/announcementQuery';
import response from '../Helpers/response';

class AnnouncementController {
  static create(req, res) {
    const announcement = req.body;
    const UserId = parseInt(req.user.id);
    query.createUser(announcement, UserId);
    return response.successResponse(res, 201, 'success', announcement);
  }

  static update(req, res) {
    const updatedAnnouncement = query.updateAnnouncement(req.params.id, req.body);
    return response.successResponse(res, 200, 'success', updatedAnnouncement);
  }

  static all(req, res) {
    const owner = parseInt(req.user.id);
    const announcements = query.findAll(owner);
    return response.successResponse(res, 200, 'success', announcements);
  }

  static findByStatus(req, res) {
    const theSatus = req.query.status;
    const owner = parseInt(req.user.id);
    const isValidStatus = validStatus(theSatus);
    if (!isValidStatus) {
      return response.failureResponse(res, 400, 'Invalid Status');
    }
    const announcements = query.findByStatus(theSatus, owner);
    return response.successResponse(res, 200, 'success', announcements);
  }

  static getAnnouncement(req, res) {
    const id = parseInt(req.params.id);
    const announcement = query.findById(id);
    return response.successResponse(res, 200, 'success', announcement);
  }

  static delete(req, res) {
    const id = parseInt(req.params.id);
    query.deleteAnnouncement(id);
    return response.deleteResponse(res, 200, 'success');
  }

  static changeStatus(req, res) {
    const id = parseInt(req.params.id);
    const theStatus = req.query.status;
    const isValidStatus = validStatus(theStatus);
    if (!isValidStatus) {
      return response.failureResponse(res, 400, 'Invalid Status');
    }
    const announcement = query.changeStatus(id, theStatus);
    return response.successResponse(res, 200, 'success', announcement);
  }

  static allAnnouncements(req, res) {
    return response.successResponse(res, 200, 'success', Announcement);
  }
}
export default AnnouncementController;
