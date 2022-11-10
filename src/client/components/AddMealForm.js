import React, { useState } from 'react';
import Button from './UI/Button';

function AddMealForm() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [when, setWhen] = useState('');
  const [reservations, setReservations] = useState('');
  const [price, setPrice] = useState('');

  function newMeal() {
    fetch('/api/meals', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title: title,
        description: description,
        location: location,
        when: when,
        max_reservations: reservations,
        price: price,
        created_date: new Date(),
      }),
    })
      .catch((e) => {
        setError(e);
      })
      .finally(() => {
        alert('Meal Added');
      });
  }
  return (
    <div>
      <div>
        <h3>Add your meal</h3>
        <form onSubmit={newMeal}>
          <label>
            Title:
            <input
              onChange={(e) => setTitle(e.target.value)}
              type='text'
              placeholder='Title'
              required
            />
          </label>
          <br />
          <label>
            Describe:
            <input
              onChange={(e) => setDescription(e.target.value)}
              type='textarea'
              placeholder='Description'
              required
            />
          </label>
          <br />
          <label>
            Location:
            <input
              onChange={(e) => setLocation(e.target.value)}
              type='text'
              placeholder='Location'
              required
            />
          </label>
          <br />
          <label>
            When:
            <input
              onChange={(e) => setWhen(e.target.value)}
              type='date'
              placeholder='When Date'
              required
            />
          </label>
          <br />
          <label>
            Max reservations:
            <input
              onChange={(e) => setReservations(e.target.value)}
              type='number'
              placeholder='Reservations'
              required
            />
          </label>
          <br />
          <label>
            Price:
            <input
              onChange={(e) => setPrice(e.target.value)}
              type='number'
              placeholder='Price'
              required
            />
          </label>
          <br />
          <Button text='Add Meal' type='submit' />
        </form>
      </div>
    </div>
  );
}

export default AddMealForm;
