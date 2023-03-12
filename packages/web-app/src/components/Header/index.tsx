import React from 'react';

import Logo from '../../assets/logo.svg';
import { HeaderContainer } from './style';

const Header = () => {
  return (
    <HeaderContainer>
      <img src={Logo} />
      <div className="heading">Raiju</div>
    </HeaderContainer>
  );
};

export default Header;