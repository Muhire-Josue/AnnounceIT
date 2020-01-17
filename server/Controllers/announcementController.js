import Announcement from '../Models/announcement';
import createAnnouncement from '../Helpers/createAnnouncement';
import successResponse from '../Helpers/successResponse';

class AnnouncementController {
  static create(req, res) {
    const announcement = req.body;
    const today = new Date();
    const date = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`;
    announcement.id = Announcement.length + 1;
    announcement.owner = req.user.id;
    announcement.status = 'pending';
    announcement.text = req.body.text;
    announcement.start_date = date;
    announcement.end_date = req.body.end_date;
    createAnnouncement(announcement);
    successResponse(res, 201, 'success', announcement);
  }
}
export default AnnouncementController;
