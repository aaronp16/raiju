import { NextFunction, Request, Response } from 'express';
import ping from 'ping';
import { DEVICES, DevicesType, DEVICES_IPS } from '../constants';

import { PowersType, POWER_OFF, POWER_ON } from '@raiju/types';

const powerController = {
  check: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const devices: { [key in DevicesType]?: PowersType } = {};

      for (const device of DEVICES) {
        const { alive } = await ping.promise.probe(DEVICES_IPS[device]);
        console.log(device, alive, POWER_ON);
        devices[device] = alive ? POWER_ON : POWER_OFF;
      }

      console.log(devices);
      res.json(devices);
    } catch (error: unknown) {
      console.error('Error calling check():', error);
      next(error);
    }
  },
};

export default powerController;
