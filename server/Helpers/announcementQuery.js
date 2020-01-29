/* eslint-disable radix */
import Announcement from '../Models/announcement';
import db from '../Models/index';

class AnnouncementQuery {
  static async createUser(announcement, ownerUser, userID) {
    const newAnnouncement = announcement;
    newAnnouncement.owner = ownerUser;
    newAnnouncement.status = 'pending';
    newAnnouncement.text = announcement.text;
    newAnnouncement.userId = userID;
    newAnnouncement.endDate = announcement.endDate;
    const {
      text, status, owner, userId, endDate,
    } = newAnnouncement;
    const insert = `INSERT INTO
    announcements(text, status, owner, "endDate", "userId")
    VALUES($1, $2, $3, $4, $5)
    returning id, text,status,owner,"endDate","createdDate"`;

    const values = [text, status, owner, endDate, userId];
    const { rows } = await db.query(insert, values);
    return rows[0];
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

  static async findByText(text) {
    const { rows } = await db.query('SELECT * FROM announcements WHERE text=$1', [text]);
    return rows[0];
  }
}
export default AnnouncementQuery;
