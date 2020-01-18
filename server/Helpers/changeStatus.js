import Announcement from '../Models/announcement';

const changeStatus = (id, status) => {
  const announcementIndex = Announcement.findIndex(a => a.id === id);
  Announcement[announcementIndex].status = status;
  return Announcement[announcementIndex];
};
export default changeStatus;
