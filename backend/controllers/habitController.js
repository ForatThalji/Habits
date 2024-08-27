
const Habit = require('../models/habitModel');

// Create a new habit
exports.createHabit = async (req, res) => {
    try {
        const habit = new Habit(req.body);
        await habit.save();
        res.status(201).json(habit);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create habit' });
    }
};

// Get a habit by ID
// exports.getHabitById = async (req, res) => {
//     try {
//         const habit = await Habit.findById(req.params.id);
//         if (!habit) {
//             return res.status(404).json({ error: 'Habit not found' });
//         }
//         res.json(habit);
//     } catch (error) {
//         res.status(500).json({ error: 'Failed to fetch habit' });
//     }
// };

// Update a habit by ID
exports.updateHabitById = async (req, res) => {
    try {
        const habit = await Habit.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!habit) {
            return res.status(404).json({ error: 'Habit not found' });
        }
        res.json(habit);
    } catch (error) {
        res.status(500).json({ error: 'Failed to update habit' });
    }
};

// Delete a habit by ID
exports.deleteHabitById = async (req, res) => {
    try {
        const habit = await Habit.findByIdAndDelete(req.params.id);
        if (!habit) {
            return res.status(404).json({ error: 'Habit not found' });
        }
        res.json({ message: 'Habit deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete habit' });
    }
};

// Get all habits with optional filtering
// Get all habits with optional filtering and searching
exports.getHabits = async (req, res) => {
    try {
        const { category, search } = req.query;
        const query = {};

        // Add category filter if provided
        if (category) {
            query.category = category;
        }

        // Add search filter if provided
        if (search) {
            query.$or = [
                { name: { $regex: search, $options: 'i' } },  // Search in 'name' field
                { description: { $regex: search, $options: 'i' } }  // Search in 'description' field
            ];
        }

        const habits = await Habit.find(query);
        res.json(habits);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch habits' });
    }
};

