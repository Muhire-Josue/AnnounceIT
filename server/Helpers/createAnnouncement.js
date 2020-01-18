/* eslint-disable no-param-reassign */
import Announcement from '../Models/announcement';

const create = (announcement, userID) => {
  const today = new Date();
  const date = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`;
  announcement.id = Announcement.length + 1;
  announcement.owner = userID;
  announcement.status = 'pending';
  announcement.text = announcement.text;
  announcement.start_date = date;
  announcement.end_date = announcement.end_date;
  Announcement.push(announcement);
};
export default create;
