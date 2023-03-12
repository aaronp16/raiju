import { NextFunction, Request, Response } from 'express';
import { NodeSSH } from 'node-ssh';
import wol from 'wol';
import ping from 'ping';

import { PC_ETHERNET_MAC_ADDRESS, PC_IP } from '../constants';
import { PowersType, POWER_OFF, POWER_ON } from '@raiju/types';

const checkPower = (power: PowersType, res: Response) => ping.sys.probe(PC_IP, (isAlive) => {
  if ((power === POWER_ON && !isAlive) || (power === POWER_OFF && isAlive)) {
    checkPower(power, res);
  } else {
    res.json({
      pc: isAlive ? POWER_ON : POWER_OFF
    });
  }
});

const pcController = {
  wake: async (req: Request, res: Response, next: NextFunction) => {
    try {
      wol.wake(PC_ETHERNET_MAC_ADDRESS);
      
      checkPower(POWER_ON, res);
    } catch (err: unknown) {
      console.error('Error calling wake():', err);
      next(err);
    }
  },
  sleep: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const ssh = new NodeSSH();

      ssh.connect({
        host: PC_IP,
        username: 'aaron',
        privateKeyPath: '/home/aaron/.ssh/id_rsa.1'
      }).then(() => {
        ssh.execCommand('%windir%/System32/rundll32.exe powrprof.dll,SetSuspendState 0,1,0');

        checkPower(POWER_OFF, res);
      });
    } catch (err: unknown) {
      console.error('Error calling sleep():', err);
      next(err);
    }
  }
};

export default pcController;