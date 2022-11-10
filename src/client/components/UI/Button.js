import React from 'react';
import styled from 'styled-components';

const ButtonUI = styled.button`
  border: none;
  height: 2.5rem;
  cursor: pointer;
  font-size: 1rem;
  background: #9d8665;
  font-family: inherit;
  margin-bottom: 5rem;
  border-radius: 0.5rem;
  width: 10rem;
  &:hover {
    color: #9d8665;
    background: white;
    border: 0.15rem solid #9d8665;
  }
`;

const Button = (props) => {
  const { text, onClick } = props;

  return (
    <ButtonUI text={text} onClick={onClick}>
      {text}
    </ButtonUI>
  );
};

export default Button;
