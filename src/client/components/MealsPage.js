import React from 'react';
import styled from 'styled-components';
import AddMealForm from './AddMealForm';
import MealsList from './MealsList';

const MainWrapper = styled.main`
  max-width: 70%;
  margin: 0 auto;
  text-align: center;
`;

function MealsPage() {
  return (
    <>
      <MealsList />
      <AddMealForm />
    </>
  );
}

export default MealsPage;
