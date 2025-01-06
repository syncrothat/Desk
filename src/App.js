import React, { useState, useEffect } from 'react';
import './style/App.css';
import Sidebar from './utils/Sidebar';
import ProjectList from './controller/Projects';
import TasksList from './controller/Tasks';
import { fetchProjects, fetchTasks } from './utils/apiService';

function App() {
  const [selectedView, setSelectedView] = useState('home');
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
        {isSidebarOpen ? (
          <span className="material-icons text-base">close</span>
        ) : (
          <span className="material-icons text-base">menu</span>
        )}
      </button>

      {/* Sidebar container */}
      <div className={`sidebar-container ${isSidebarOpen ? 'open' : ''}`}>
        <Sidebar onSelect={setSelectedView} />
      </div>

      {/* Main content */}
      <div className="main-content">
        {selectedView === 'home' && (
          <>
            <div className="my-4">
              <h1 className="text-2xl font-bold">Home</h1>
            </div>
            <div className="my-4">
              <h1 className="text-xl font-bold mb-4">My Projects</h1>
              <ProjectList projects={projects} />
            </div>
            <div className="my-4">
              <h1 className="text-xl font-bold mb-4">My Tasks</h1>
              <TasksList tasks={tasks} />
            </div>
          </>
        )}
        {selectedView === 'project' && (
          <>
            <div className="my-4">
              <h1 className="text-2xl font-bold">My Projects</h1>
              <ProjectList projects={projects} />
            </div>

          </>
        )}
        {selectedView === 'task' && (
          <>
            <div className="my-4">
              <h1 className="text-2xl font-bold">My Tasks</h1>
              <TasksList tasks={tasks} />
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default App;
