import React, { useEffect, useState } from 'react';
import { fetchProjects } from '../utils/apiService';

const ProjectList = ({ onNavigate }) => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const getProjects = async () => {
      try {
        const data = await fetchProjects();
        setProjects(data.data || []);
      } catch (error) {
        console.error('Error loading projects:', error);
      }
    };

    getProjects();
  }, []);

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {projects.map((project) => (
          <div
            key={project.projectid}
            className="bg-white rounded-xl shadow-md p-4 border border-gray-200 cursor-pointer"
            onClick={() => onNavigate(project.projectid)}
          >
            <h2 className="text-lg font-semibold mb-2">{project.project_name}</h2>
            <p className="text-gray-700 mb-2">{project.description}</p>
            <div className="info">
              <div className="info-item">
                <span className="material-icons">person_outline</span>
                <span>{project.members_count}</span>
              </div>
              <div className="info-item">
                <span className="material-icons">sort</span>
                <span>{project.tasks_count}</span>
              </div>
            </div>
          </div>
        ))}
        <div
          key="new_project"
          className="bg-slate-50 rounded-xl shadow-md p-4 border text-center cursor-pointer"
          onClick={() => onNavigate('createProject')}
        >
          <h2 className="text-6xl font-semibold">
            <span className="material-icons">add</span>
          </h2>
          <p className="text-gray-700 font-semibold mb-2">Create new project</p>
        </div>
      </div>
    </div>
  );
};

export default ProjectList;