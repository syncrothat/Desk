import React, { useState, useEffect } from 'react';
import './style/App.css';
import Sidebar from './utils/Sidebar';
import ProjectList from './view/Projects';
import TasksList from './view/Tasks';
import MyInfoView from './view/Summary';
import CreateProfile from './view/CreateProfile';
import EditProfile from './view/EditProfile';
import CreateProject from './view/CreateProject';
import { fetchUserProfile, fetchProjects, fetchTasks } from './utils/apiService';

function App() {
  const [selectedView, setSelectedView] = useState('home');
  const [projects, setProjects] = useState([]);
  const [myInfo, setMyInfo] = useState({});
  const [tasks, setTasks] = useState([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      try {
        const userProfile = await fetchUserProfile();
        const userInfo = userProfile.data;
        setMyInfo(userInfo);
  
        if (!userInfo.first_name || !userInfo.last_name) {
          setSelectedView('createProfile');
          return;
        }
  
        let data;
        if (selectedView === 'home') {
          data = await Promise.all([fetchProjects(), fetchTasks()]);
          setProjects(data[0].data);
          setTasks(data[1].data);
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

  const handleReturnHome = () => {
    setSelectedView('home'); 
  };

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
        <Sidebar onSelect={setSelectedView} setIsSidebarOpen={setIsSidebarOpen} />
      </div>

      <div className="main-content px-8">
        {selectedView === 'home' && (
          <>
            <div className="my-4 py-8">
              <h1 className="text-2xl font-bold">
                Hello, {myInfo.first_name}!
              </h1>
            </div>
            <div className="my-4">
              <MyInfoView myInfo={myInfo} />
            </div>
            <div className="my-4">
              <h1 className="text-xl font-bold mb-4">My Projects</h1>
              <ProjectList projects={projects} onNavigate={setSelectedView} />
            </div>
            <div className="my-4">
              <h1 className="text-xl font-bold mb-4">My Tasks</h1>
              <TasksList tasks={tasks} />
            </div>
          </>
        )}
        {selectedView === 'project' && (
          <>
            <div className="my-4 py-8">
              <h1 className="text-2xl font-bold">My Projects</h1>
              <ProjectList projects={projects} />
            </div>
          </>
        )}
        {selectedView === 'task' && (
          <>
            <div className="my-4 py-8">
              <h1 className="text-2xl font-bold">My Tasks</h1>
              <TasksList tasks={tasks} />
            </div>
          </>
        )}
        {selectedView === 'createProfile' && (
          <>
            <div className="my-4">
              <CreateProfile onProfileCreated={handleReturnHome} />
            </div>
          </>
        )}
        {selectedView === 'editProfile' && (
          <>
            <div className="my-4">
              <EditProfile onProfileEdited={handleReturnHome} />
            </div>
          </>
        )}
        {selectedView === 'createProject' && (
          <>
            <div className="my-4">
              <CreateProject onProjectCreated={handleReturnHome} />
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default App;
