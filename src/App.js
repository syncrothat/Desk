import React, { useState, useEffect } from 'react';
import './style/App.css';
import Sidebar from './utils/Sidebar';
import ProjectList from './view/Projects';
import TasksList from './view/Tasks';
import MyInfoView from './view/Summary';
import { fetchProjects, fetchTasks, fetchMyInfo } from './utils/apiService';

function App() {
  const [selectedView, setSelectedView] = useState('home');
  const [projects, setProjects] = useState([]);
  const [myInfo, setMyInfo] = useState({});
  const [tasks, setTasks] = useState([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      try {
        let data;
        if (selectedView === 'home') {
          data = await Promise.all([fetchMyInfo(), fetchProjects(), fetchTasks()]);
          setMyInfo(data[0]);
          setProjects(data[1].data);
          setTasks(data[2].data);
        } else if (selectedView === 'project') {
          data = await fetchProjects();
          setProjects(data.data);
        } else if (selectedView === 'task') {
          data = await fetchTasks();
          setTasks(data.data);
        }
      } catch (error) {
        console.error('Error loading data:', error);
      }
    };

    loadData();
  }, [selectedView]);

  return (
    <div className="app">
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

      <div className={`sidebar-container ${isSidebarOpen ? 'open' : ''}`}>
        <Sidebar onSelect={setSelectedView} />
      </div>

      <div className="main-content">
        {selectedView === 'home' && (
          <>
            <div className="my-4">
              <h1 className="text-2xl font-bold">Home</h1>
            </div>
            <div className="my-4">
              <MyInfoView myInfo={myInfo} />
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
