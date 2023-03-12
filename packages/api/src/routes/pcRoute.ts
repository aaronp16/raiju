import { Router } from 'express';
import pcController from '../controllers/pcController';

const pcRouter = Router();

pcRouter.get('/wake', pcController.wake);
pcRouter.get('/sleep', pcController.sleep);

export default pcRouter;