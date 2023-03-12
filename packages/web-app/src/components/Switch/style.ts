import styled, { keyframes } from 'styled-components';

const getSwitchBackgroundColour = (on: boolean, disabled?: boolean) => {
  if (disabled) {
    return '#8f8f8f';
  }

  if (on) {
    return '#364932';
  }

  return '#493232';
};

export const SwitchContainer = styled.div<{
  on: boolean;
  disabled: boolean;
}>`
  display: flex;
  align-items: center;
  position: relative;
  width: 55px;
  padding: 5px;
  background-color: ${({ on }) => getSwitchBackgroundColour(on)};
  pointer-events: ${({ disabled }) => disabled ? 'none' : 'all'};
  border-radius: 75px;
  cursor: pointer;
`;

export const Rotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(359deg);
  }
`;

export const Handle = styled.div<{
  on: boolean;
}>`
  width: 26px;
  height: 26px;
  border-radius: 50px;
  transform: translateX(${({ on }) => on ? '30px' : '0px'});
  background-color: ${({ on }) => on ? '#399A21' : '#BF2626'};
  display: flex;
  align-items: center;
  justify-content: center;

  svg {
    width: 18px;
    height: 18px;
    animation: ${Rotate} 2s infinite linear;
  }
`;