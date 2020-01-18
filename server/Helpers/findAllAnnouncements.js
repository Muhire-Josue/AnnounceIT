import findByOwnerId from './findByOwnerId';

const findAll = (id) => {
  const announcements = findByOwnerId(id);
  return announcements;
};
export default findAll;
