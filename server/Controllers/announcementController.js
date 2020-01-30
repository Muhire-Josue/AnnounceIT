/* eslint-disable max-len */
/* eslint-disable radix */
import validStatus from '../Helpers/validateStatus';
import query from '../Helpers/announcementQuery';
import response from '../Helpers/response';

class AnnouncementController {
  static async create(req, res) {
    const announcement = req.body;
    const owner = req.user.firstName;
    const userID = parseInt(req.user.id);
    const newAnnouncement = await query.createUser(announcement, owner, userID);
    return response.successResponse(res, 201, 'Announcement created successully', newAnnouncement);
  }

  static async update(req, res) {
    const updatedAnnouncement = await query.updateAnnouncement(req.params.id, req.body);
    return response.successResponse(res, 200, 'Announcement updated successfully', updatedAnnouncement);
  }

  static async all(req, res) {
    const owner = req.user.id;
    const announcements = await query.findAll(owner);
    return response.successResponse(res, 200, 'All your announcements', announcements);
  }

  static async findByStatus(req, res) {
    const theSatus = req.query.status;
    const owner = req.user.id;
    const isValidStatus = validStatus(theSatus);
    if (!isValidStatus) {
      return response.failureResponse(res, 400, 'Invalid Status');
    }
    const announcements = await query.findByStatus(theSatus, owner);
    if (!announcements.length > 0) {
      return response.failureResponse(res, 404, 'Announcement not found');
    }
    return response.successResponse(res, 200, 'Announcements by status', announcements);
  }

  static async getAnnouncement(req, res) {
    const id = parseInt(req.params.id);
    const announcement = await query.findById(id);
    return response.successResponse(res, 200, 'Annoucement', announcement);
  }

  static delete(req, res) {
    const id = parseInt(req.params.id);
    query.deleteAnnouncement(id);
    return response.deleteResponse(res, 200, 'Announcement Deleted successfully');
  }

  static async changeStatus(req, res) {
    const id = parseInt(req.params.id);
    const theStatus = req.query.status;
    const isValidStatus = validStatus(theStatus);
    if (!isValidStatus) {
      return response.failureResponse(res, 400, 'Invalid Status');
    }
    const announcement = await query.changeStatus(id, theStatus);
    return response.successResponse(res, 200, 'Status changed successfully', announcement);
  }

  static async allAnnouncements(req, res) {
    const announcements = await query.allTheAnnoucements();
    return response.successResponse(res, 200, 'All announcements', announcements);
  }
}
export default AnnouncementController;
