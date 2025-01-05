import React, { useState, useEffect } from 'react';
import './App.css';
import Sidebar from './Sidebar';
import ProjectList from './ProjectList';
import { fetchProjects, fetchTasks } from './apiService';

function App() {
  const [selectedView, setSelectedView] = useState('project');
  const [projects, setProjects] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Sidebar visibility state

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
          setTasks(taskData.data);
        } catch (error) {
          console.error('Error loading tasks:', error);
        }
      }
    };

    loadData();
  }, [selectedView]);

  return (
    <div className="app">
      {/* Sidebar toggle button */}
      <button
        className="toggle-sidebar-btn"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
      >
        {isSidebarOpen ? 'Close Menu' : 'Open Menu'}
      </button>

      {/* Sidebar container */}
      <div className={`sidebar-container ${isSidebarOpen ? 'open' : ''}`}>
        <Sidebar onSelect={setSelectedView} />
      </div>

      {/* Main content */}
      <div className="main-content">
        {selectedView === 'project' && (
          <>
            <h1>Project</h1>
            <ProjectList projects={projects} />
          </>
        )}
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
