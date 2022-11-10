import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Nav = styled.nav`
  display: flex;
`;

const ListItems = styled.ul`
  display: flex;
`;

const ListItem = styled.ul`
  margin-left: 2rem;
`;

const StyledLink = styled.a`
  color: #9d8665;
  cursor: pointer;
  font-size: 1.5rem;

  &:hover {
    color: white;
  }
`;

function NavMenu() {
  return (
    <Nav>
      <ListItems>
        <ListItem>
          <StyledLink>
            <Link to='/meals' style={{ color: 'inherit' }}>
              MEALS
            </Link>
          </StyledLink>
        </ListItem>
        <ListItem>
          <StyledLink>
            <Link to='/' style={{ color: 'inherit' }}>
              RESERVATIONS
            </Link>
          </StyledLink>
        </ListItem>
      </ListItems>
    </Nav>
  );
}

export default NavMenu;
