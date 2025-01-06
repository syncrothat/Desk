import React from 'react';

const Sidebar = ({ onSelect }) => {
  return (
    <div className="sidebar">
      <button className='py-2 px-4 rounded-b-lg sidebar-menu' onClick={() => onSelect('project')}>
        <span className="material-icons sidebar-icons text-base">work_outline</span>Projects
      </button>
      <button className='py-2 px-4 rounded-b-lg sidebar-menu' onClick={() => onSelect('task')}>
        <span className="material-icons sidebar-icons text-base">sort</span>Tasks
      </button>
    </div>
  );
};

export default Sidebar;
