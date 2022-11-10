import React from 'react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Button from './UI/Button';
import HorizontalLine from './UI/HorizontalLine';
import img from '../assets/images/img1.jpg';

const MainWrapper = styled.main`
  max-width: 70%;
  margin: 0 auto;
  text-align: center;
`;

function MealsList(props) {
  const [meals, setMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    fetch('http://localhost:5000/api/meals')
      .then((res) => res.json())
      .then((data) => {
        setMeals(data);
      })
      .then(() => {
        setIsLoading(false);
        setIsLoaded(true);
      });
  }, []);
  let partMeals = meals;
  if (props.max) {
    partMeals = meals.slice(0, props.max);
  }

  return (
    <MainWrapper
      style={{
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
      }}
    >
      <h2 style={{ fontSize: '3rem' }}>Our meals</h2>
      <HorizontalLine />
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '0.5rem 1rem',
          justifyContent: 'space-between',
          paddingTop: '5rem',
          marginBottom: '5rem',
        }}
      >
        {isLoading && <p> Is loading...</p>}
        {meals.length === 0 && isLoaded && <p> No meals found</p>}

        {partMeals.map((meal, index) => {
          return (
            <div
              key={index}
              style={{ maxWidth: '20rem', border: '0.1rem solid #9d8665' }}
            >
              <div style={{ maxHeight: '20rem', overflow: 'hidden' }}>
                <img style={{ width: '100%' }} src={img} />
              </div>
              <h3>{meal.title}</h3>
              <p>{meal.description}</p>
              <Link to={`/meals/${meal.id}`}>
                <Button text='VIEW MORE' />
              </Link>
            </div>
          );
        })}
      </div>
    </MainWrapper>
  );
}

export default MealsList;
