import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Button from './UI/Button';
import MealsList from './MealsList';

const MainWrapper = styled.main`
  margin: 0 auto;
  text-align: center;
`;

const Content = styled.div`
  background: url('https://images.unsplash.com/photo-1556761223-4c4282c73f77?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1965&q=80');
  width: 100%;
  background-color: black;
  background-size: cover;
  background-position: 26rem 27%;
  height: calc(100vh - 10rem);
  background-repeat: no-repeat;
  display: flex;
  align-items: center;
`;

const HomePage = () => {
  return (
    <MainWrapper>
      <Content>
        <div
          style={{
            marginLeft: '10rem',
          }}
        >
          <h1 style={{ color: '#9d8665', fontSize: '4rem' }}>Meal sharing</h1>
          <p style={{ color: '#9d8665', fontSize: '1.5rem' }}>
            Foodsharing involves collecting unwanted and overproduced food
            products that would otherwise be discarded and redistributing them
            to the people who will consume them. The food products can be
            collected directly from private households as well as from small or
            medium-sized businesses.
          </p>
          <Link to='/meals' style={{ color: 'inherit' }}></Link>
        </div>
        <div style={{ minWidth: '50%' }}></div>
      </Content>
      <MealsList max='4' isShowForm={false} />
      <Link to='/meals'>
        <Button text='VIEW ALL MEALS' />
      </Link>
    </MainWrapper>
  );
};

export default HomePage;
