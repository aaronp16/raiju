export const PC_ETHERNET_MAC_ADDRESS = 'B4-2E-99-C7-D2-BC';

export const PC_DEVICE = 'pc';
export const PC_IP = '192.168.1.228';

export const DEVICES_IPS = {
  [PC_DEVICE]: PC_IP,
};

export const DEVICES = [PC_DEVICE] as const;
export type DevicesType = (typeof DEVICES)[number];

export const DEVICE_ADDRESSES = [PC_IP];
