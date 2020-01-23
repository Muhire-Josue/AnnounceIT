/* eslint-disable radix */
import validStatus from '../Helpers/validateStatus';
import Announcement from '../Models/announcement';
import query from '../Helpers/announcementQuery';
import response from '../Helpers/response';

class AnnouncementController {
  static create(req, res) {
    const announcement = req.body;
    const owner = req.user.firstname;
    query.createUser(announcement, owner);
    return response.successResponse(res, 201, 'Announcement created successully', announcement);
  }

  static update(req, res) {
    const updatedAnnouncement = query.updateAnnouncement(req.params.id, req.body);
    return response.successResponse(res, 200, 'Announcement updated successfully', updatedAnnouncement);
  }

  static all(req, res) {
    const owner = req.user.firstname;
    const announcements = query.findAll(owner);
    return response.successResponse(res, 200, 'All your announcements', announcements);
  }

  static findByStatus(req, res) {
    const theSatus = req.query.status;
    const owner = req.user.firstname;
    const isValidStatus = validStatus(theSatus);
    if (!isValidStatus) {
      return response.failureResponse(res, 400, 'Invalid Status');
    }
    const announcements = query.findByStatus(theSatus, owner);
    if (!announcements.length > 0) {
      return response.failureResponse(res, 404, 'Announcement not found');
    }
    return response.successResponse(res, 200, 'Announcements by status', announcements);
  }

  static getAnnouncement(req, res) {
    const id = parseInt(req.params.id);
    const announcement = query.findById(id);
    return response.successResponse(res, 200, 'Annoucement', announcement);
  }

  static delete(req, res) {
    const id = parseInt(req.params.id);
    query.deleteAnnouncement(id);
    return response.deleteResponse(res, 200, 'Announcement Deleted successfully');
  }

  static changeStatus(req, res) {
    const id = parseInt(req.params.id);
    const theStatus = req.query.status;
    const isValidStatus = validStatus(theStatus);
    if (!isValidStatus) {
      return response.failureResponse(res, 400, 'Invalid Status');
    }
    const announcement = query.changeStatus(id, theStatus);
    return response.successResponse(res, 200, 'Status changed successfully', announcement);
  }

  static allAnnouncements(req, res) {
    return response.successResponse(res, 200, 'All announcements', Announcement);
  }
}
export default AnnouncementController;
