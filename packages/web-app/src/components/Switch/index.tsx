import React from 'react';
import { Handle, SwitchContainer } from './style';
import { FaSpinner } from 'react-icons/fa';

interface SwitchProps {
  value: boolean;
  onClick: () => void;
  loading: boolean;
}

const Switch = ({ loading, value, onClick }: SwitchProps) => {
  return (
    <SwitchContainer disabled={loading} on={value} onClick={onClick}>
      <Handle on={value}>
        {loading && <FaSpinner />}
      </Handle>
    </SwitchContainer>
  );
};

export default Switch;