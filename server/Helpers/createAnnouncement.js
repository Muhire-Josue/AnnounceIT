/* eslint-disable no-param-reassign */
import Announcement from '../Models/announcement';

const create = data => Announcement.push(data);
export default create;
