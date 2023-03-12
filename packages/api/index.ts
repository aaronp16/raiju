import express from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import pcRouter from './src/routes/pcRoute';
import powerRouter from './src/routes/powerRoute';
import { BaconType } from '@raiju/types';

dotenv.config({
  path: '../../.env'
});

const app = express();
const port = process.env['PORT'];

app.use(bodyParser.json());

// Routes that require auth
// app.use(verifyToken);
app.use('/pc', pcRouter);
app.use('/power', powerRouter);
// app.use('/tag', tagsRouter);
// app.use('/user', usersRouter);

app.listen(port, () => {
  console.log(`[server]: Server is running at https://localhost:${port}`);
});
