import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import Token from '../config/Token';

const EditProfile = ({ onProfileEdited }) => {
  const [formData, setFormData] = useState({
    bio: '',
    first_name: '',
    middle_name: '',
    last_name: '',
    mail: '',
    phone: '',
    country: '',
    dob: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: name === 'dob' ? `${value}T00:00:00Z` : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        'https://apisync.herobuxx.me/api/protected/profile',
        formData,
        {
          headers: {
            Authorization: `Bearer ${Token}`,
            'Content-Type': 'application/json',
          },
        }
      );
      onProfileEdited();
    } catch (error) {
      console.error('Error updating profile:', error);

      Swal.fire({
        icon: 'error',
        title: 'There is something wrong!',
        text: 'We couldn\'t your profile.',
      });
    }
  };
  
  return (
    <div className="flex items-center justify-center min-h-screen p-6 bg-gray-50">
    <div className="p-6 max-w-lg mx-auto bg-white rounded-2xl shadow-md border border-gray-200">
      <h1 className="text-2xl mb-2 font-bold">Edit Your Profile</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700" htmlFor="first_name">
            First Name
          </label>
          <input
            type="text"
            id="first_name"
            name="first_name"
            className="mt-1 block p-2 h-10 w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            value={formData.first_name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700" htmlFor="middle_name">
            Middle Name
          </label>
          <input
            type="text"
            id="middle_name"
            name="middle_name"
            className="mt-1 block p-2 h-10 w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            value={formData.middle_name}
            onChange={handleChange}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700" htmlFor="last_name">
            Last Name
          </label>
          <input
            type="text"
            id="last_name"
            name="last_name"
            className="mt-1 block p-2 h-10 w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            value={formData.last_name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700" htmlFor="bio">
            Bio
          </label>
          <textarea
            id="bio"
            name="bio"
            className="mt-1 block p-2 h-10 w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            value={formData.bio}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700" htmlFor="mail">
            Email
          </label>
          <input
            type="email"
            id="mail"
            name="mail"
            className="mt-1 block p-2 h-10 w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            value={formData.mail}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700" htmlFor="phone">
            Phone
          </label>
          <input
            type="text"
            id="phone"
            name="phone"
            className="mt-1 block p-2 h-10 w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            value={formData.phone}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label className="block h-10 text-sm font-medium text-gray-700" htmlFor="country">
            Country
          </label>
          <input
            type="text"
            id="country"
            name="country"
            className="mt-1 block p-2 h-10 w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            value={formData.country}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700" htmlFor="dob">
            Date of Birth
          </label>
          <input
            type="date"
            id="dob"
            name="dob"
            className="mt-1 block p-2 h-10 w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            value={formData.dob.split('T')[0]}
            onChange={handleChange}
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-gray-700 text-white py-2 px-4 rounded-full shadow-sm hover:bg-gray-800 focus:outline-none"
        >
          Submit
        </button>
      </form>
    </div>
    </div>
  );
};

export default EditProfile;
