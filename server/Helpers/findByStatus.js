import findByOwnerId from './findByOwnerId';

const findByStatus = (status, owner) => {
  const announcements = findByOwnerId(owner);
  return announcements.filter(a => a.status === status);
};
export default findByStatus;
