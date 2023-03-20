import { Router } from 'express';
import fs from 'fs';

import transmissionController from '../controllers/transmissionController';

import multer from 'multer';

const dir = 'uploads/';

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir);
    }
    cb(null, dir);
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

const transmissionRouter = Router();

transmissionRouter.put('/upload', upload.array('files[]'), transmissionController.upload);

export default transmissionRouter;
