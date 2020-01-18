import Announcement from '../Models/announcement';

const findById = id => Announcement.find(a => a.id === id);
export default findById;
