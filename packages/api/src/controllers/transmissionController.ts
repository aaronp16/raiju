import { NextFunction, Request, Response } from 'express';

import fs from 'fs';

import { NodeSSH } from 'node-ssh';
import { PC_IP } from '../constants';

const transmissionController = {
  upload: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const ssh = new NodeSSH();

      ssh
        .connect({
          host: PC_IP,
          username: 'aaron',
          privateKeyPath: '/home/aaron/.ssh/id_rsa.1',
        })
        .then(async () => {
          await ssh.putDirectory('uploads', 'C:/Users/Aaron/Torrents');
          fs.rmSync('uploads', { recursive: true });

          res.json({
            uploaded: true,
          });
        });
    } catch (error: unknown) {
      console.error('Error calling check():', error);
      next(error);
    }
  },
};

export default transmissionController;
