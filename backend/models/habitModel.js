const mongoose = require('mongoose');

const HabitSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        trim: true
    },
    status: {
        type: Boolean,
        default: false
    },
    category: {
        type: String,
        trim: true
    },
    tags: [{
        type: String,
        trim: true
    }],
    created_at: {
        type: Date,
        default: Date.now
    },
    updated_at: {
        type: Date,
        default: Date.now
    }
});

// Update the updated_at field before each save
// HabitSchema.pre('save', function(next) {
//     this.updated_at = Date.now();
//     next();
// });

module.exports = mongoose.model('Habit', HabitSchema);
