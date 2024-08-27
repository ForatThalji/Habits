import React from 'react';

function HabitList({ habits, onEdit, onDelete }) {
    return (
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
                                onClick={() => onEdit(habit)}
                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded mr-2"
                            >
                                Update
                            </button>
                            <button 
                                onClick={() => onDelete(habit._id)}
                                className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
                            >
                                Delete
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default HabitList;
