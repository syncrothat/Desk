import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import Token from '../config/Token';

const CreateTask = ({ projectId, onTaskCreated }) => {
  const [formData, setFormData] = useState({
    projectid: projectId,
    title: '',
    description: '',
    deadline: '',
    is_completed: false,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: name === 'deadline' ? `${value}T00:00:00Z` : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        'https://api.sync2.buxxed.me/api/protected/task',
        formData,
        {
          headers: {
            Authorization: `Bearer ${Token}`,
            'Content-Type': 'application/json',
          },
        }
      );
      onTaskCreated();
    } catch (error) {
      console.error('Error creating new task:', error);
  
      Swal.fire({
        icon: 'error',
        title: 'There is something wrong!',
        text: 'We couldn\'t create a new task.',
      });
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-6 bg-gray-50">
      <div className="p-6 w-full max-w-lg mx-auto bg-white rounded-2xl shadow-md border border-gray-200 md:w-1/2">
        <h1 className="text-2xl mb-2 font-bold">Create new task</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700" htmlFor="title">
              Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              className="mt-1 block p-2 h-10 w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700" htmlFor="description">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              className="mt-1 block p-2 h-10 w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              value={formData.description}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700" htmlFor="deadline">
              Deadline
            </label>
            <input
              type="date"
              id="deadline"
              name="deadline"
              className="mt-1 block p-2 h-10 w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              value={formData.deadline.split('T')[0]}
              onChange={handleChange}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-gray-700 text-white py-2 px-4 rounded-full shadow-sm hover:bg-gray-800 focus:outline-none"
          >
            Create
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateTask;