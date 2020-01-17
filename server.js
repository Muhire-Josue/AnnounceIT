/* eslint-disable import/no-unresolved */
/* eslint-disable no-console */
import express from 'express';
import useRoutes from './server/Routes/userRoutes';
import announcementRoutes from './server/Routes/announcementRoutes';

const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.json());
app.use(useRoutes);
app.use(announcementRoutes);
app.listen(PORT, () => console.log(`server running on port ${PORT}`));
export default app;
