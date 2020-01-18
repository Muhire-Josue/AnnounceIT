/* eslint-disable radix */
import Announcement from '../Models/announcement';

const update = (id, data) => {
  const announcementID = parseInt(id);
  const announcementIndex = Announcement.findIndex(a => a.id === announcementID);
  Announcement[announcementIndex].text = data.text;
  Announcement[announcementIndex].end_date = data.end_date;
  return Announcement[announcementIndex];
};
export default update;
