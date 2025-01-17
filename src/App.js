// App.js
import React, { useState, useEffect } from 'react';
import './style/App.css';
import Sidebar from './utils/Sidebar';
import ProjectList from './view/Projects';
import TasksList from './view/Tasks';
import MyInfoView from './view/Summary';
import CreateProfile from './view/CreateProfile';
import EditProfile from './view/EditProfile';
import CreateProject from './view/CreateProject';
import InviteMember from './view/InviteMember';
import ProjectDetails from './view/ProjectDetails';
import CreateTask from './view/CreateTask';
import { fetchUserProfile, fetchProjects, fetchTasks } from './utils/apiService';

function App() {  
  const [selectedView, setSelectedView] = useState('home');
  const [projects, setProjects] = useState([]);
  const [myInfo, setMyInfo] = useState({});
  const [tasks, setTasks] = useState([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedProjectId, setSelectedProjectId] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        const userProfile = await fetchUserProfile();
        const userInfo = userProfile.data;
        setMyInfo(userInfo);

        if (!userInfo.first_name || !userInfo.last_name) {
          setSelectedView('createProfile');
          setLoading(false);
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
        if (error.response && error.response.status === 404) {
          setSelectedView('createProfile');
        } else {
          console.error('Error loading data:', error);
        }
      }
      setLoading(false);
    };

    loadData();
  }, [selectedView]);

  const handleReturnHome = () => {
    setSelectedView('home');
  };

  const handleViewChange = (view) => {
    setIsAnimating(true);
    setTimeout(() => {
      setSelectedView(view);
    }, 150);
  };

  const handleProjectClick = (projectId) => {
    if (projectId === 'createProject') {
      setSelectedView('createProject');
    } else {
      setSelectedProjectId(projectId);
      setSelectedView('projectDetails');
    }
  };

  const handleInviteMember = (projectId) => {
    setSelectedProjectId(projectId);
    setSelectedView('inviteMember');
  };

  const handleCreateTask = (projectId) => {
    setSelectedProjectId(projectId);
    setSelectedView('createTask');
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

      <div className={isSidebarOpen ? 'sidebar-container open' : 'sidebar-container'}>
        <Sidebar
          onSelect={handleViewChange}
          setIsSidebarOpen={setIsSidebarOpen}
          selectedView={selectedView}
        />
      </div>

      <div
        className={`main-content px-8 ${isAnimating ? 'fade-out' : 'fade-in'}`}
        onTransitionEnd={() => setIsAnimating(false)}
      >
        {loading ? (
          <div className="loading-spinner">
            <svg
              className="spinner-frame"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 100 100"
              preserveAspectRatio="xMidYMid"
              width="200"
              height="200"
              style={{
                shapeRendering: 'auto',
                display: 'block',
              }}
            >
              <g>
                <path
                  stroke="none"
                  fill="#003366"
                  d="M10 50A40 40 0 0 0 90 50A40 42 0 0 1 10 50"
                >
                  <animateTransform
                    values="0 50 51;360 50 51"
                    keyTimes="0;1"
                    repeatCount="indefinite"
                    dur="0.75s"
                    type="rotate"
                    attributeName="transform"
                  ></animateTransform>
                </path>
              </g>
            </svg>
          </div>
        ) : (
          <>
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
                  <ProjectList projects={projects} onNavigate={handleProjectClick} />
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
                  <ProjectList projects={projects} onNavigate={handleProjectClick} />
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
            {selectedView === 'inviteMember' && (
              <>
                <div className="my-4">
                  <InviteMember
                    projectId={selectedProjectId}
                    onMemberAdded={handleReturnHome}
                  />
                </div>
              </>
            )}
            {selectedView === 'projectDetails' && (
              <>
                <div className="my-4">
                  <ProjectDetails
                    projectId={selectedProjectId}
                    onBack={handleReturnHome}
                    onInviteMember={handleInviteMember}
                    onCreateTask={handleCreateTask}
                  />
                </div>
              </>
            )}
            {selectedView === 'createTask' && (
              <>
                <div className="my-4">
                  <CreateTask 
                    projectId={selectedProjectId}
                    onTaskCreated={handleReturnHome} 
                  />
                </div>
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default App;