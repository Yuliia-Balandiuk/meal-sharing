const express = require('express');
const router = express.Router();
const knex = require('../database');
router.use(express.json());

router.get('/', async (req, res) => {
  try {
    const allReservation = await knex.select().table('reservation');

    if (allReservation.length !== 0) {
      res.send(allReservation);
    } else {
      res.status(404).json({ error: 'Reservations not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

router.post('/', async (req, res) => {
  try {
    const newReservation = await knex.insert(req.body).into('reservation');

    res.send({ massage: `Reservation with ID ${newReservation} created` });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const reservationId = req.params.id;
    const reservation = await knex
      .select()
      .from('reservation')
      .where({ id: reservationId });

    if (reservation.length !== 0) {
      res.send(reservation);
    } else {
      res.status(404).json({ error: 'Reservation not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const reservationBody = req.body;
    const reservationId = req.params.id;
    const reservation = await knex('reservation').where({ id: reservationId });

    if (reservation.length === 0) {
      res.status(400).json({ error: 'Reservation not found' });
    }
    if (reservationBody.length !== 0) {
      const updatedReservation = await knex('reservation')
        .where({
          id: reservationId,
        })
        .update(reservationBody);

      res.send(updatedReservation);
    } else {
      res.status(404).json({ error: 'It is nothing to update' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const reservationId = req.params.id;
    const reservation = await knex('reservation').where({ id: reservationId });

    if (reservation.length === 0) {
      res.status(400).json({ error: 'Reservation not found' });
    }
    await knex('reservation').where({ id: reservationId }).del();
    res.send({ message: `Reservation with id: ${reservationId} deleted` });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
