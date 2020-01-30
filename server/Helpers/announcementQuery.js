/* eslint-disable max-len */
/* eslint-disable radix */
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

  static async changeStatus(id, status) {
    const { rows } = await db.query('SELECT * FROM announcements WHERE id=$1', [id]);
    const announcement = rows[0];
    const updateQuery = 'UPDATE announcements SET text=$1, status=$2, owner=$3, "endDate"=$4, "userId"=$5 WHERE id=$6 RETURNING id, text,status,owner,"endDate","createdDate"';
    const values = [announcement.text, status, announcement.owner, announcement.endDate, announcement.userId, id];
    const change = await db.query(updateQuery, values);
    const result = change.rows;
    return result;
  }

  static async updateAnnouncement(id, data) {
    const { text, endDate } = data;
    const { rows } = await db.query('SELECT * FROM announcements WHERE id=$1', [id]);
    const announcement = rows[0];
    const updateQuery = 'UPDATE announcements SET text=$1, status=$2, owner=$3, "endDate"=$4, "userId"=$5 WHERE id=$6 RETURNING id, text,status,owner,"endDate","createdDate"';
    const values = [text, announcement.status, announcement.owner, endDate, announcement.userId, id];
    const change = await db.query(updateQuery, values);
    const result = change.rows;
    return result;
  }

  static async findAll(ownerUser) {
    const { rows } = await db.query('SELECT * FROM announcements WHERE "userId"=$1', [ownerUser]);
    return rows;
  }

  static async findByStatus(status, owner) {
    const { rows } = await db.query('SELECT * FROM announcements WHERE "userId"=$1', [owner]);
    const announcements = rows;
    return announcements.filter(a => a.status === status);
  }

  static async findById(id) {
    const { rows } = await db.query('SELECT * FROM announcements WHERE id=$1', [id]);
    return rows[0];
  }

  static async deleteAnnouncement(id) {
    await db.query('DELETE FROM announcements WHERE id=$1', [id]);
  }

  static async findByText(text) {
    const { rows } = await db.query('SELECT * FROM announcements WHERE text=$1', [text]);
    return rows[0];
  }

  static async allTheAnnoucements() {
    const { rows } = await db.query('SELECT * FROM announcements');
    return rows;
  }
}
export default AnnouncementQuery;
