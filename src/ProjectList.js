// src/ProjectList.js
import React, { useEffect, useState } from 'react';
import { fetchProjects } from './apiService';

const ProjectList = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const getProjects = async () => {
      try {
        const data = await fetchProjects();
        setProjects(data.data);
      } catch (error) {
        console.error('Error loading projects:', error);
      }
    };

    getProjects();
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Projects</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {projects.map((project) => (
          <div
            key={project.projectid}
            className="bg-white rounded-lg shadow-md p-4 border border-gray-200"
          >
            <h2 className="text-lg font-semibold mb-2">{project.project_name}</h2>
            <p className="text-gray-700">{project.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectList;
