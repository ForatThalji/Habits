import React, { useState, useEffect } from 'react';

function HabitForm({ onSubmit, onCancel, editHabit }) {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [status, setStatus] = useState(false);
    const [category, setCategory] = useState("");

    useEffect(() => {
        if (editHabit) {
            setName(editHabit.name);
            setDescription(editHabit.description);
            setStatus(editHabit.status);
            setCategory(editHabit.category);
        }
    }, [editHabit]);

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit({ name, description, status, category });
    };

    return (
        <div className="bg-gray-100 p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">{editHabit ? 'Update Habit' : 'Add a New Habit'}</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
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
                    {editHabit ? 'Update Habit' : 'Add Habit'}
                </button>
                <button 
                    type="button" 
                    onClick={onCancel}
                    className="ml-4 bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
                >
                    Cancel
                </button>
            </form>
        </div>
    );
}

export default HabitForm;
