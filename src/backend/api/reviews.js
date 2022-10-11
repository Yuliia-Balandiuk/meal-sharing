const express = require('express');
const router = express.Router();
const knex = require('../database');

router.get('/', async (req, res) => {
  try {
    const allReview = await knex.select('*').table('review');

    if (allReview.length !== 0) {
      res.send(allReview);
    } else {
      res.status(200).json({ error: 'No reviews found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

router.post('/', async (req, res) => {
  try {
    const newReview = await knex.insert(req.body).into('review');

    res.send({ massage: `Review with ID ${newReview} created` });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const reviewId = req.params.id;
    const review = await knex.select().from('review').where({ id: reviewId });

    if (review.length !== 0) {
      res.send(review);
    } else {
      res.status(200).json({ error: 'No review found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const reviewBody = req.body;
    const reviewId = req.params.id;
    const review = await knex('review').where({ id: reviewId });

    if (review.length === 0) {
      res.status(400).json({ error: 'Review not found' });
    }
    if (reviewBody.length !== 0) {
      await knex('review').where({ id: reviewId }).update(reviewBody);
      const updatedReview = await knex('review').where({ id: reviewId });
      res.send(updatedReview);
    } else {
      res.status(404).json({ error: 'It is nothing to update' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const reviewId = req.params.id;
    const review = await knex('review').where({ id: reviewId });

    if (review.length === 0) {
      res.status(400).json({ error: 'Review not found' });
    }
    await knex('review').where({ id: reviewId }).del();
    res.send({ message: `Review with id: ${reviewId} deleted` });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
