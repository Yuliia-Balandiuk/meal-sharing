import React from 'react';
import styled from 'styled-components';
import logo from '../assets/images/logo.png';

const FooterWrapper = styled.footer`
  min-height: 10rem;
  background-color: #000000;
  color: #9d8665;
  display: flex;
  padding: 1rem 10rem;
  align-items: center;
  justify-content: space-between;
`;

function Footer() {
  return (
    <FooterWrapper>
      <img
        style={{ maxWidth: '3rem', cursor: 'pointer' }}
        src={logo}
        alt='logo'
      />
    </FooterWrapper>
  );
}

export default Footer;
