import Announcement from '../Models/announcement';

const duplication = (text) => {
  const announcement = Announcement.find(t => t.text === text);
  return announcement;
};
export default duplication;
