const express = require('express');
const router = express.Router();
const habitController = require('../controllers/habitController');

// Create a new habit (POST)
router.post('/', habitController.createHabit);

// Get a habit by ID (GET)
// router.get('/:id', habitController.getHabitById);

// Update a habit by ID (PUT)
router.put('/:id', habitController.updateHabitById);

// Delete a habit by ID (DELETE)
router.delete('/:id', habitController.deleteHabitById);

// Get all habits with optional filtering (GET)
router.get('/', habitController.getHabits);

module.exports = router;
