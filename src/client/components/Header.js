import React from 'react';
import styled from 'styled-components';
import logo from '../assets/images/logo.png';
import NavMenu from './NavMenu';

const HeaderWrapper = styled.header`
  min-height: 10rem;
  background-color: #000000;
  color: #9d8665;
  display: flex;
  padding: 2rem 10rem;
  align-items: center;
  justify-content: space-between;
`;

function Header() {
  return (
    <HeaderWrapper>
      <img
        style={{ maxWidth: '5rem', cursor: 'pointer' }}
        src={logo}
        alt='logo'
      />
      <NavMenu />
    </HeaderWrapper>
  );
}

export default Header;
