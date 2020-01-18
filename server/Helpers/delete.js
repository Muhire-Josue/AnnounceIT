import Announcement from '../Models/announcement';
import findById from './findById';

const deleteAnnouncement = (id) => {
  const announcement = findById(id);
  const announcementIndex = Announcement.indexOf(announcement);
  return Announcement.splice(announcementIndex, 1);
};
export default deleteAnnouncement;
