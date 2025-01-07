import React from 'react';
import logo from '../assets/logo/white-no-bg.png';

const Sidebar = ({ onSelect, setIsSidebarOpen }) => {
  const handleMenuClick = (view) => {
    onSelect(view);
    setIsSidebarOpen(false);
  };

  return (
    <div className="sidebar">
      <img 
        className='w-12 h-auto' 
        src={logo} alt="Logo"
        onClick={() => handleMenuClick('home')}  
      />
      <button
        className='py-2 px-4 rounded-b-lg sidebar-menu'
        onClick={() => handleMenuClick('home')}
      >
        <span className="material-icons sidebar-icons text-base">home</span>Home
      </button>
      <button
        className='py-2 px-4 rounded-b-lg sidebar-menu'
        onClick={() => handleMenuClick('createProfile')}
      >
        <span className="material-icons sidebar-icons text-base">person</span>Profile
      </button>
      <button
        className='py-2 px-4 rounded-b-lg sidebar-menu'
        onClick={() => handleMenuClick('project')}
      >
        <span className="material-icons sidebar-icons text-base">work</span>Projects
      </button>
      <button
        className='py-2 px-4 rounded-b-lg sidebar-menu'
        onClick={() => handleMenuClick('task')}
      >
        <span className="material-icons sidebar-icons text-base">sort</span>Tasks
      </button>
    </div>
  );
};

export default Sidebar;
