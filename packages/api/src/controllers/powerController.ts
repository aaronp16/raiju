import { NextFunction, Request, Response } from 'express';
import ping from 'ping';
import { DEVICES, DevicesType, Power, POWER_ON, POWER_OFF, DEVICES_IPS } from '../constants';

const powerController = {
  check: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const devices: {[key in DevicesType]?: Power} = {};

      for (const device of DEVICES) {
        const { alive } = await ping.promise.probe(DEVICES_IPS[device]);
        
        devices[device] = alive ? POWER_ON : POWER_OFF;
      }

      res.json(devices);
    } catch (error: unknown) {
      console.error('Error calling check():', error);
      next(error);
    }
  }
};

export default powerController;