import Announcement from '../Models/announcement';

const findById = owner => Announcement.filter(a => a.owner === owner);
export default findById;
