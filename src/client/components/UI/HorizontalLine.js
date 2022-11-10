import React from 'react';
import styled from 'styled-components';

const DividerBox = styled.div`
  margin: auto;
  margin-top: 20px;
  width: 80%;
  position: relative;
`;

const ShadowBox = styled.div`
  overflow: hidden;
  height: 20px;
  &:after {
    content: '';
    display: block;
    margin: -25px auto 0;
    width: 100%;
    height: 25px;
    border-radius: 125px/12px;
    box-shadow: 0 0 8px #9d8665;
  }
`;

const HorizontalLine = () => {
  return (
    <div>
      <DividerBox></DividerBox>
      <ShadowBox></ShadowBox>
    </div>
  );
};

export default HorizontalLine;
