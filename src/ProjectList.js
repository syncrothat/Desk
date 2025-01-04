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
      <h1>Projects</h1>
      <ul>
        {projects.map((project) => (
          <li key={project.projectid}>
            <h2>{project.project_name}</h2>
            <p>{project.description}</p>
            <p>Owner ID: {project.ownerid}</p>
            <p>Created At: {new Date(project.created_at).toLocaleString()}</p>
            <p>Updated At: {new Date(project.updated_at).toLocaleString()}</p>
            <h3>Members</h3>
            <ul>
              {project.members.map((member) => (
                <li key={member.userid}>
                  <p>Role: {member.role}</p>
                  <p>Is Admin: {member.is_admin ? 'Yes' : 'No'}</p>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProjectList;
