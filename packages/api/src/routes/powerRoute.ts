import { Router } from 'express';
import powerController from '../controllers/powerController';

const powerRouter = Router();

powerRouter.get('/check', powerController.check);

export default powerRouter;
