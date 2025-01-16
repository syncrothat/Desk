import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { fetchProjects } from '../utils/apiService'; // Ensure this import is correct
import Token from '../config/Token';

const InviteMember = ({ onMemberAdded }) => {
  const [formData, setFormData] = useState({
    project_id: '',
    members: [
      {
        username: '',
        role: '',
        is_admin: false,
      },
    ],
  });

  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch projects when component loads
  useEffect(() => {
    const loadProjects = async () => {
      try {
        const data = await fetchProjects();
        setProjects(data.data || []); // Assuming data is structured like in the provided response
        setLoading(false);
      } catch (error) {
        console.error('Error loading projects:', error);
        Swal.fire({
          icon: 'error',
          title: 'Failed to load projects',
          text: 'Could not fetch projects. Please try again later.',
        });
      }
    };
    loadProjects();
  }, []);

  const handleProjectChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleMemberChange = (index, e) => {
    const { name, value } = e.target;
    const updatedMembers = [...formData.members];
    updatedMembers[index][name] = name === 'is_admin' ? value === 'true' : value;
    setFormData({ ...formData, members: updatedMembers });
  };

  const addMember = () => {
    setFormData({
      ...formData,
      members: [
        ...formData.members,
        { username: '', role: '', is_admin: false },
      ],
    });
  };

  const removeMember = (index) => {
    const updatedMembers = formData.members.filter((_, i) => i !== index);
    setFormData({ ...formData, members: updatedMembers });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { project_id, members } = formData;

    try {
      await axios.post(
        `https://api.sync2.buxxed.me/api/protected/project/invite/${project_id}`,
        members,
        {
          headers: {
            Authorization: `Bearer ${Token}`,
            'Content-Type': 'application/json',
          },
        }
      );
      Swal.fire({
        icon: 'success',
        title: 'Success!',
        text: 'Members invited successfully.',
      });
      onMemberAdded();
    } catch (error) {
      console.error('Error inviting members:', error);
      Swal.fire({
        icon: 'error',
        title: 'There is something wrong!',
        text: 'We couldn\'t invite the members. Please try again.',
      });
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-6 bg-gray-50">
      <div className="p-6 max-w-lg mx-auto bg-white rounded-2xl shadow-md border border-gray-200">
        <h1 className="text-2xl mb-2 font-bold">Invite Members</h1>
        <h1 className="text-sm mb-6 text-gray-400">Invite multiple members to your project in SyncroApp!</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700" htmlFor="project_id">
              Select Project
            </label>
            {loading ? (
              <p>Loading projects...</p>
            ) : (
              <select
                id="project_id"
                name="project_id"
                className="mt-1 block p-2 h-10 w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                value={formData.project_id}
                onChange={handleProjectChange}
                required
              >
                <option value="" disabled>
                  Select a project
                </option>
                {projects.map((project) => (
                  <option key={project.projectid} value={project.projectid}>
                    {project.project_name}
                  </option>
                ))}
              </select>
            )}
          </div>

          {formData.members.map((member, index) => (
            <div key={index} className="space-y-2 border p-4 rounded-md">
              <h2 className="text-sm font-semibold">Member {index + 1}</h2>
              <div>
                <label className="block text-sm font-medium text-gray-700" htmlFor={`username-${index}`}>
                  Username
                </label>
                <input
                  type="text"
                  id={`username-${index}`}
                  name="username"
                  className="mt-1 block p-2 h-10 w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  value={member.username}
                  onChange={(e) => handleMemberChange(index, e)}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700" htmlFor={`role-${index}`}>
                  Role
                </label>
                <input
                  type="text"
                  id={`role-${index}`}
                  name="role"
                  className="mt-1 block p-2 h-10 w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  value={member.role}
                  onChange={(e) => handleMemberChange(index, e)}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700" htmlFor={`is_admin-${index}`}>
                  Admin Privileges
                </label>
                <select
                  id={`is_admin-${index}`}
                  name="is_admin"
                  className="mt-1 block p-2 h-10 w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  value={member.is_admin}
                  onChange={(e) => handleMemberChange(index, e)}
                  required
                >
                  <option value="false">No</option>
                  <option value="true">Yes</option>
                </select>
              </div>
              <button
                type="button"
                className="w-full bg-gray-700 text-white py-2 px-4 rounded-full shadow-sm hover:bg-gray-800 focus:outline-none"
                onClick={() => removeMember(index)}
              >
              <span className="material-icons text-base">close</span>
            </button>
            </div>
          ))}

          <div className="flex justify-between gap-x-2">
            <button
              type="button"
              className="w-1/2 bg-gray-700 text-white py-2 px-4 rounded-full shadow-sm hover:bg-gray-800 focus:outline-none"
              onClick={addMember}
            >
              <span className="material-icons text-base">add</span> Add
            </button>

            <button
              type="submit"
              className="w-1/2 bg-gray-700 text-white py-2 px-4 rounded-full shadow-sm hover:bg-gray-800 focus:outline-none"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default InviteMember;
