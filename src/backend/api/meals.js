const express = require('express');
const router = express.Router();
const knex = require('../database');

router.get('/', async (req, res) => {
  try {
    const allMeals = await knex.select().table('meal');

    if (allMeals.length !== 0) {
      res.send(allMeals);
    } else {
      res.status(404).json({ error: 'Meals not found' });
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
      res.status(404).json({ error: 'Meal not found' });
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
      await knex('meal').where({ id: mealId }).update(mealBody);
      const updatedMeal = await knex('meal').where({ id: mealId });
      res.send(updatedMeal);
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
      res.status(400).json({ error: 'Meal not found' });
    }
    await knex('meal').where({ id: mealId }).del();
    res.send({ message: `Meal with id: ${mealId} deleted` });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
