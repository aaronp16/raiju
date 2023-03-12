export const POWER_ON = "on";
export const POWER_OFF = "off";

export type PowersType = typeof POWER_ON | typeof POWER_OFF;

export interface PowerResponseType {
  pc: PowersType;
}