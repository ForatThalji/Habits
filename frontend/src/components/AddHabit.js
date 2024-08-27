import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
    const [habits, setHabits] = useState([]);
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [status, setStatus] = useState(false);
    const [category, setCategory] = useState("");
    const [filterCategory, setFilterCategory] = useState("");
    const [searchTerm, setSearchTerm] = useState(""); // Added for search
    const [showForm, setShowForm] = useState(false);
    const [editHabitId, setEditHabitId] = useState(null);

    useEffect(() => {
        const fetchHabits = async () => {
            try {
                const params = new URLSearchParams();
                if (filterCategory) params.append('category', filterCategory);
                if (searchTerm) params.append('search', searchTerm); // Added for search

                console.log('Fetching habits with params:', params.toString()); // Debugging
                const response = await axios.get(`http://localhost:3000/habit?${params.toString()}`);
                setHabits(response.data);
            } catch (error) {
                console.error('Error fetching habits:', error);
            }
        };

        fetchHabits();
    }, [filterCategory, searchTerm]); // Added searchTerm to dependencies

    const handleAddHabit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3000/habit', {
                name,
                description,
                status,
                category
            });

            setHabits([...habits, response.data]);
            setName('');
            setDescription('');
            setStatus(false);
            setCategory('');
            alert('Habit added successfully!');
        } catch (error) {
            console.error('Error adding habit:', error);
            alert('Failed to add habit');
        }
    };

    const handleUpdateHabit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put(`http://localhost:3000/habit/${editHabitId}`, {
                name,
                description,
                status,
                category
            });

            setHabits(habits.map(habit => habit._id === editHabitId ? response.data : habit));
            setName('');
            setDescription('');
            setStatus(false);
            setCategory('');
            setEditHabitId(null);
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

    const showEditForm = (habit) => {
        setEditHabitId(habit._id);
        setName(habit.name);
        setDescription(habit.description);
        setStatus(habit.status);
        setCategory(habit.category);
        setShowForm(true);
    };

    const handleFilterChange = (e) => {
        const selectedCategory = e.target.value;
        setFilterCategory(selectedCategory);
        console.log('Selected Category:', selectedCategory); // Debugging
    };

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-6 text-center">Habit Manager</h1>

            {/* Search Form */}
            <div className="mb-6 flex flex-wrap gap-4">
                <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Search:</label>
                    <input 
                        type="text" 
                        value={searchTerm}
                        onChange={handleSearchChange}
                        placeholder="Search habits"
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                    />
                </div>

                {/* Filter by Category */}
                <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Filter by Category:</label>
                    <select 
                        value={filterCategory} 
                        onChange={handleFilterChange}
                        className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                    >
                        <option value="">All</option>
                        <option value="Health">Health</option>
                        <option value="Work">Work</option>
                        <option value="Personal Development">Personal Development</option>
                    </select>
                </div>
            </div>

            {/* Habit List */}
            <div className="mb-6">
                <h2 className="text-2xl font-semibold mb-4">Habit List</h2>
                <ul className="space-y-4">
                    {habits.map((habit) => (
                        <li key={habit._id} className="bg-white shadow overflow-hidden sm:rounded-lg p-4">
                            <div className="mb-2">
                                <span className="font-semibold">{habit.name}</span> - {habit.description} - 
                                <span className={`ml-2 px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${habit.status ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                                    {habit.status ? 'Active' : 'Inactive'}
                                </span> - 
                                <span className="ml-2 text-gray-500">{habit.category}</span>
                            </div>
                            <div className="mt-2">
                                <button 
                                    onClick={() => showEditForm(habit)}
                                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded mr-2"
                                >
                                    Update
                                </button>
                                <button 
                                    onClick={() => handleDeleteHabit(habit._id)}
                                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
                                >
                                    Delete
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Toggle Form */}
            <button 
                onClick={() => setShowForm(!showForm)}
                className="mb-6 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
            >
                {showForm ? 'Hide Form' : 'Add New Habit'}
            </button>

            {showForm && (
                <div className="bg-gray-100 p-6 rounded-lg shadow-md">
                    <h2 className="text-xl font-semibold mb-4">{editHabitId ? 'Update Habit' : 'Add a New Habit'}</h2>
                    <form onSubmit={editHabitId ? handleUpdateHabit : handleAddHabit} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Name:</label>
                            <input 
                                type="text" 
                                value={name} 
                                onChange={(e) => setName(e.target.value)}
                                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Description:</label>
                            <textarea 
                                value={description} 
                                onChange={(e) => setDescription(e.target.value)}
                                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Status:</label>
                            <input 
                                type="checkbox" 
                                checked={status} 
                                onChange={(e) => setStatus(e.target.checked)}
                            />
                            <span className="ml-2">Active</span>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Category:</label>
                            <select 
                                value={category} 
                                onChange={(e) => setCategory(e.target.value)}
                                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                                required
                            >
                                <option value="">Select Category</option>
                                <option value="Health">Health</option>
                                <option value="Work">Work</option>
                                <option value="Personal Development">Personal Development</option>
                            </select>
                        </div>
                        <button 
                            type="submit" 
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                        >
                            {editHabitId ? 'Update Habit' : 'Add Habit'}
                        </button>
                    </form>
                </div>
            )}
        </div>
    );
}

export default App;
