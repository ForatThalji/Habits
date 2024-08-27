import React from 'react';

function SearchAndFilter({ searchTerm, onSearchChange, filterCategory, onFilterChange }) {
    return (
        <div className="mb-6 flex flex-wrap gap-4">
            <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-1">Search:</label>
                <input 
                    type="text" 
                    value={searchTerm}
                    onChange={onSearchChange}
                    placeholder="Search habits"
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                />
            </div>
            <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-1">Filter by Category:</label>
                <select 
                    value={filterCategory} 
                    onChange={onFilterChange}
                    className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                >
                    <option value="">All</option>
                    <option value="Health">Health</option>
                    <option value="Work">Work</option>
                    <option value="Personal Development">Personal Development</option>
                </select>
            </div>
        </div>
    );
}

export default SearchAndFilter;
