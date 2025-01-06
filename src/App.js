import React, { useState, useEffect } from 'react';
import './style/App.css';
import Sidebar from './utils/Sidebar';
import ProjectList from './controller/Projects';
import TasksList from './controller/Tasks';
import { fetchProjects, fetchTasks } from './utils/apiService';

function App() {
  const [selectedView, setSelectedView] = useState('project');
  const [projects, setProjects] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      if (selectedView === 'home') {
        try {
          const projectData = await fetchProjects();
          const taskData = await fetchTasks();
          setProjects(projectData.data);
          setTasks(taskData.data);
        } catch (error) {
          console.error('Error loading projects and tasks:', error);
        }
      } else if (selectedView === 'project') {
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
        {isSidebarOpen ? <span className="material-icons text-base">close</span> : <span className="material-icons text-base">menu</span>}
      </button>

      {/* Sidebar container */}
      <div className={`sidebar-container ${isSidebarOpen ? 'open' : ''}`}>
        <Sidebar onSelect={setSelectedView} />
      </div>

      {/* Main content */}
      <div className="main-content">
        {selectedView === 'home' && (
          <>
            <ProjectList projects={projects} />
            <TasksList tasks={tasks} />
          </>
        )}
        {selectedView === 'project' && (
          <>
            <ProjectList projects={projects} />
          </>
        )}
        {selectedView === 'task' && (
          <>
          <TasksList tasks={tasks} />
          </>
        )}
      </div>
    </div>
  );
}

export default App;
