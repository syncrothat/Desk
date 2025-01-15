import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import Token from '../config/Token';

const CreateProject = ({ onProjectCreated }) => {
  const [formData, setFormData] = useState({
    project_name: '',
    description: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        'https://api.sync2.buxxed.me/api/protected/project',
        formData,
        {
          headers: {
            Authorization: `Bearer ${Token}`,
            'Content-Type': 'application/json',
          },
        }
      );
      onProjectCreated();
    } catch (error) {
      console.error('Error creating project:', error);
  
      Swal.fire({
        icon: 'error',
        title: 'There is something wrong!',
        text: 'We couldn\'t create a new project. Please check if a project already exists.',
      });
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-6 bg-gray-50">
      <div className="p-6 max-w-lg w-full bg-white rounded-2xl shadow-md border border-gray-200">
        <h1 className="text-2xl mb-6 font-bold">Create a new project</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700" htmlFor="project_name">
              Project Name
            </label>
            <input
              type="text"
              id="project_name"
              name="project_name"
              className="mt-1 block p-2 h-10 w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              value={formData.project_name}
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
              className="mt-1 block p-2 w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              value={formData.description}
              onChange={handleChange}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-gray-700 text-white py-2 px-4 rounded-full shadow-sm hover:bg-gray-800 focus:outline-none"
          >
            Create project
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateProject;
