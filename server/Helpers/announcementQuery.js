/* eslint-disable radix */
import Announcement from '../Models/announcement';
// import user from '../Models/user';

class AnnouncementQuery {
  static createUser(announcement, userID) {
    const today = new Date();
    const date = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`;
    const newAnnouncement = announcement;
    newAnnouncement.id = Announcement.length + 1;
    newAnnouncement.owner = userID;
    newAnnouncement.status = 'pending';
    newAnnouncement.text = announcement.text;
    newAnnouncement.start_date = date;
    newAnnouncement.end_date = announcement.end_date;
    Announcement.push(newAnnouncement);
  }

  static changeStatus(id, status) {
    const announcementIndex = Announcement.findIndex(a => a.id === id);
    Announcement[announcementIndex].status = status;
    return Announcement[announcementIndex];
  }

  static updateAnnouncement(id, data) {
    const announcementID = parseInt(id);
    const announcementIndex = Announcement.findIndex(a => a.id === announcementID);
    Announcement[announcementIndex].text = data.text;
    Announcement[announcementIndex].end_date = data.end_date;
    return Announcement[announcementIndex];
  }

  static findAll(id) {
    const announcements = Announcement.filter(a => a.owner === id);
    return announcements;
  }

  static findByStatus(status, owner) {
    const announcements = Announcement.filter(a => a.owner === owner);
    return announcements.filter(a => a.status === status);
  }

  static findById(id) {
    return Announcement.find(a => a.id === id);
  }

  static deleteAnnouncement(id) {
    const announcement = Announcement.find(a => a.id === id);
    const announcementIndex = Announcement.indexOf(announcement);
    return Announcement.splice(announcementIndex, 1);
  }

  static findByText(text) {
    const announcement = Announcement.find(t => t.text === text);
    return announcement;
  }
}
export default AnnouncementQuery;
