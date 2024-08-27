

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import HabitForm from '../src/components/HabitForm';
import HabitList from '../src/components/HabitList';
import SearchAndFilter from '../src/components/SearchAndFilter';

function App() {
    const [habits, setHabits] = useState([]);
    const [filterCategory, setFilterCategory] = useState("");
    const [searchTerm, setSearchTerm] = useState("");
    const [showForm, setShowForm] = useState(false);
    const [editHabitId, setEditHabitId] = useState(null);
    const [editHabit, setEditHabit] = useState(null);

    useEffect(() => {
        const fetchHabits = async () => {
            try {
                const params = new URLSearchParams();
                if (filterCategory) params.append('category', filterCategory);
                if (searchTerm) params.append('search', searchTerm);

                const response = await axios.get(`http://localhost:3000/habit?${params.toString()}`);
                setHabits(response.data);
            } catch (error) {
                console.error('Error fetching habits:', error);
            }
        };

        fetchHabits();
    }, [filterCategory, searchTerm]);

    const handleAddHabit = async (habit) => {
        try {
            const response = await axios.post('http://localhost:3000/habit', habit);
            setHabits([...habits, response.data]);
            resetForm();
            alert('Habit added successfully!');
        } catch (error) {
            console.error('Error adding habit:', error);
            alert('Failed to add habit');
        }
    };

    const handleUpdateHabit = async (habit) => {
        try {
            const response = await axios.put(`http://localhost:3000/habit/${editHabitId}`, habit);
            setHabits(habits.map(h => h._id === editHabitId ? response.data : h));
            resetForm();
            alert('Habit updated successfully!');
        } catch (error) {
            console.error('Error updating habit:', error);
            alert('Failed to update habit');
        }
    };

    const handleDeleteHabit = async (habitId) => {
        try {
            await axios.delete(`http://localhost:3000/habit/${habitId}`);
            setHabits(habits.filter(habit => habit._id !== habitId));
            alert('Habit deleted successfully!');
        } catch (error) {
            console.error('Error deleting habit:', error);
            alert('Failed to delete habit');
        }
    };

    const handleSearchChange = (e) => setSearchTerm(e.target.value);
    const handleFilterChange = (e) => setFilterCategory(e.target.value);

    const resetForm = () => {
        setShowForm(false);
        setEditHabitId(null);
        setEditHabit(null);
    };

    return (
        <div className="p-6 max-w-4xl mx-auto">
            <SearchAndFilter 
                searchTerm={searchTerm}
                onSearchChange={handleSearchChange}
                filterCategory={filterCategory}
                onFilterChange={handleFilterChange}
            />
            {showForm && (
                <HabitForm 
                    onSubmit={editHabit ? handleUpdateHabit : handleAddHabit} 
                    onCancel={resetForm}
                    editHabit={editHabit}
                />
            )}
            {!showForm && (
                <button 
                    onClick={() => setShowForm(true)}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                    Add New Habit
                </button>
            )}
            <HabitList 
                habits={habits} 
                onEdit={(habit) => {
                    setEditHabitId(habit._id);
                    setEditHabit(habit);
                    setShowForm(true);
                }} 
                onDelete={handleDeleteHabit} 
            />
        </div>
    );
}

export default App;
