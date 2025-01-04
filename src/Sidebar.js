// src/Sidebar.js
import React from 'react';

const Sidebar = ({ onSelect }) => {
  return (
    <div className="sidebar">
      <button onClick={() => onSelect('project')}>Project</button>
      <button onClick={() => onSelect('task')}>Task</button>
    </div>
  );
};

export default Sidebar;