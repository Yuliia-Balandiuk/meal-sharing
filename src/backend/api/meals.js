const express = require('express');
const router = express.Router();
const knex = require('../database');

router.get('/', async (req, res) => {
  let query = knex.select('meal.*').from('meal');

  if ('maxPrice' in req.query) {
    const maxPrice = parseInt(req.query.maxPrice);

    meals = mealsTable.where('price', '<', maxPrice);
  }

  if ('availableReservations' in req.query) {
    const isAvailableReservations = req.query.availableReservations;

    meals = query
      .join('reservation', 'reservation.meal_id', '=', 'meal.id')
      .groupBy('meal.id');
    if (isAvailableReservations === 'true') {
      meals = meals.where(
        'meal.max_reservations',
        '>',
        'SUM(reservation.number_of_guests)'
      );
    } else {
      meals = meals.where(
        'meal.max_reservations',
        '=',
        'SUM(reservation.number_of_guests)'
      );
    }
  }

  if ('title' in req.query) {
    const title = String(req.query.title).toLocaleLowerCase();

    meals = query.where('title', 'like', `%${title}%`);
  }

  if ('dateAfter' in req.query) {
    const dateAfter = new Date(req.query.dateAfter);

    meals = query.where('when', '>=', dateAfter);
  }

  if ('dateBefore' in req.query) {
    const dateBefore = new Date(req.query.dateAfter);

    meals = query.where('when', '<=', dateBefore);
  }

  if ('limit' in req.query) {
    const limit = parseInt(req.query.limit);

    meals = query.limit(limit);
  }

  if ('sortKey' in req.query) {
    const sortKey = String(req.query.sortKey);

    if (sortKey === 'price') {
      meals = query.orderByRaw(sortKey);
    } else if (sortKey === 'when') {
      meals = query.orderBy(sortKey);
    } else if (sortKey === 'max_reservations') {
      meals = query.orderByRaw(sortKey);
    }
  }

  if ('sortDir' in req.query && 'sortKey' in req.query) {
    const sortKey = String(req.query.sortKey);
    const sortDir = String(req.query.sortDir);

    if (!sortKey || !sortDir) {
      res
        .status(404)
        .json({ error: 'You did not enter sort key or direction' });
    } else if (sortKey === 'price' && sortDir === 'desc') {
      meals = query.orderBy(sortKey, 'desc');
    } else if (sortKey === 'when' && sortDir === 'desc') {
      meals = query.orderBy(sortKey, 'desc');
    } else if (sortKey === 'max_reservations' && sortDir === 'desc') {
      meals = query.orderByRaw(sortKey, 'desc');
    }
  }

  try {
    const meal = await query;

    if (meal.length !== 0) {
      res.send(meal);
    } else {
      res.status(200).json({ error: 'No meals found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

router.post('/', async (req, res) => {
  try {
    const newMeal = await knex.insert(req.body).into('meal');

    res.send({ massage: `Meal with ID ${newMeal} created` });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const mealId = req.params.id;
    const meal = await knex.select().from('meal').where({ id: mealId });

    if (meal.length !== 0) {
      res.send(meal);
    } else {
      res.status(404).json({ massage: 'Meal not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const mealBody = req.body;
    const mealId = req.params.id;
    const meal = await knex('meal').where({ id: mealId });

    if (meal.length === 0) {
      res.status(400).json({ error: 'Meal not found' });
    }
    if (mealBody.length !== 0) {
      const updatedMeal = await knex('meal').where({ id: mealId });

      res.send(updatedMeal).update(mealBody);
    } else {
      res.status(404).json({ error: 'It is nothing to update' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const mealId = req.params.id;
    const meal = await knex('meal').where({ id: mealId });

    if (meal.length === 0) {
      res.status(400).json({ message: 'Meal not found' });
    }
    await knex('meal').where({ id: mealId }).del();
    res.send({ message: `Meal with id: ${mealId} deleted` });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

router.get('/:meal_id/reviews', async (req, res) => {
  const mealId = req.params.meal_id;
  const query = knex
    .select('review.*')
    .from('review')
    .join('meal', 'review.meal_id', '=', `meal.id`)
    .where('meal_id', '=', mealId);

  try {
    const reviews = await query;
    if (reviews.length !== 0) {
      res.send(reviews);
    } else {
      res.status(404).json({ error: 'Reviews not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
