// src/App.js
import React, { useState, useEffect } from 'react';
import './App.css';  // Ensure this line is present
import Sidebar from './Sidebar';
import ProjectList from './ProjectList';  // Your existing ProjectList component
import { fetchProjects } from './apiService';  // API call for project data
import { fetchTasks } from './apiService';  // API call for task data

function App() {
  const [selectedView, setSelectedView] = useState('project'); // Default to "project"
  const [projects, setProjects] = useState([]);
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      if (selectedView === 'project') {
        try {
          const projectData = await fetchProjects();
          setProjects(projectData.data);
        } catch (error) {
          console.error('Error loading projects:', error);
        }
      } else if (selectedView === 'task') {
        try {
          const taskData = await fetchTasks();
          setTasks(taskData.data);  // Set the task data
        } catch (error) {
          console.error('Error loading tasks:', error);
        }
      }
    };

    loadData();
  }, [selectedView]);

  return (
    <div className="app">
      <Sidebar onSelect={setSelectedView} />

      <div className="main-content">
        {selectedView === 'project' && <ProjectList projects={projects} />}
        {selectedView === 'task' && (
          <div>
            <h1>Task Data</h1>
            <ul>
              {tasks.map((task) => (
                <li key={task.taskid}>
                  <h3>{task.task_name}</h3>
                  <p>{task.description}</p>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
