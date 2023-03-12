import Switch from '../Switch';
import React from 'react';
import { DeviceMenuContainer } from './style';

interface DeviceMenuProps {
  name: string;
  on: boolean;
  children: React.ReactNode;
  powerToggle: () => void;
  loading: boolean;
}

const DeviceMenu = ({ name, on, powerToggle, children, loading }: DeviceMenuProps) => {
  return (
    <DeviceMenuContainer>
      <div className="device-menu-header">
        <div className="device-name">{name}</div>
        <div className="device-power">
          <Switch loading={loading} value={on} onClick={powerToggle} />
        </div>
      </div>
      <div className="device-content">
        {children}
      </div>
    </DeviceMenuContainer>
  );
};

export default DeviceMenu;