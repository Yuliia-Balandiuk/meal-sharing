import React from 'react';
import styled from 'styled-components';
import NavMenu from './NavMenu';
import logo from '../assets/images/logo.png';
import { Link } from 'react-router-dom';

const FooterWrapper = styled.footer`
  display: flex;
  color: #9d8665;
  min-height: 10rem;
  padding: 1rem 10rem;
  align-items: center;
  background-color: #000000;
  justify-content: space-between;
`;

function Footer() {
  return (
    <FooterWrapper>
      <Link to='/'>
        <img
          style={{ maxWidth: '3rem', cursor: 'pointer' }}
          src={logo}
          alt='logo'
        />
      </Link>
      <NavMenu />
    </FooterWrapper>
  );
}

export default Footer;
