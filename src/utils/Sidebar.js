import React from 'react';
import logo from '../assets/logo/white-no-bg.png';

const Sidebar = ({ onSelect }) => {
  return (
    <div className="sidebar">
        <img className='w-12 h-auto' src={logo} alt="Logo" />
        <button className='py-2 px-4 rounded-b-lg sidebar-menu' onClick={() => onSelect('home')}>
        <span className="material-icons sidebar-icons text-base">home</span>Home
      </button>
      <button className='py-2 px-4 rounded-b-lg sidebar-menu' onClick={() => onSelect('project')}>
        <span className="material-icons sidebar-icons text-base">work</span>Projects
      </button>
      <button className='py-2 px-4 rounded-b-lg sidebar-menu' onClick={() => onSelect('task')}>
        <span className="material-icons sidebar-icons text-base">sort</span>Tasks
      </button>
    </div>
  );
};

export default Sidebar;
