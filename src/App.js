import React, { useState, useEffect, useCallback } from 'react';
import './style/App.css';
import Sidebar from './utils/Sidebar';
import ProjectList from './view/Projects';
import TasksList from './view/Tasks';
import MyInfoView from './view/Summary';
import CreateProfile from './view/CreateProfile';
import EditProfile from './view/EditProfile';
import CreateProject from './view/CreateProject';
import { fetchUserProfile, fetchProjects, fetchTasks } from './utils/apiService';
import Token from './config/Token';

function App() {
  const [selectedView, setSelectedView] = useState('home');
  const [projects, setProjects] = useState([]);
  const [myInfo, setMyInfo] = useState({});
  const [tasks, setTasks] = useState([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false); // New state for animation
  const [loading, setLoading] = useState(false); // New state for loading

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);  // Set loading to true before fetching data
      try {
        const userProfile = await fetchUserProfile();
        const userInfo = userProfile.data;
        setMyInfo(userInfo);

        if (!userInfo.first_name || !userInfo.last_name) {
          setSelectedView('createProfile');
          setLoading(false); // Set loading to false when data is loaded
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
      setLoading(false);  // Set loading to false when data is loaded
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
  
  async function subscribeUserToPush() {
    try {
      const registration = await navigator.serviceWorker.ready;
  
      const subscription = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: 'BJtwvMJIq6_p7Z7hjxkGqicX2Az1sIW2m4oM8TbWYrF2TTCsu7FOJDw3Aa_gNpneSDrntAPsfIp5kQQ8ii_LZMw',
      });
  
      console.log('Push subscription:', subscription);
  
      await fetch('https://api.sync2.buxxed.me/api/protected/webnotif/subscribe', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${Token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(subscription),
      });
    } catch (error) {
      console.error('Failed to subscribe to push notifications:', error);
    }
  }

  const askNotificationPermission = useCallback(async () => {
    const storedPermission = localStorage.getItem('notification-permission');
    if (storedPermission === 'granted' || storedPermission === 'denied') {
      console.log('Permission already handled:', storedPermission);
      return;
    }

    if (!('Notification' in window)) {
      console.error('This browser does not support notifications.');
      return;
    }

    const permission = await Notification.requestPermission();
    localStorage.setItem('notification-permission', permission);

    if (permission === 'granted') {
      console.log('Notification permission granted!');
      subscribeUserToPush();
    } else if (permission === 'denied') {
      console.warn('Notification permission denied.');
    } else {
      console.log('Notification permission closed without granting.');
    }
  }, []);

  useEffect(() => {
    askNotificationPermission();
  }, [askNotificationPermission]);

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
          </>
        )}
      </div>
    </div>
  );
}

export default App;