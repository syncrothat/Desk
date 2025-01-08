import React, { useEffect, useState } from 'react';
import { fetchMyInfo } from '../utils/apiService';

const MyInfoView = () => {
  const [myInfo, setMyInfo] = useState({
    project_count: 0,
    task_count: 0,
  });

  useEffect(() => {
    const getMyInfo = async () => {
      try {
        const data = await fetchMyInfo();
        setMyInfo(data);
      } catch (error) {
        console.error('Error loading info:', error);
      }
    };

    getMyInfo();
  }, []);

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        <div
          key="project-count-card"
          className="bg-gray-800 rounded-xl shadow-md p-4 border border-gray-500"
        >
          <h2 className="text-6xl text-white mb-2">{myInfo?.project_count}</h2>
          <p className="text-white mb-2 font-semibold">Projects</p>
        </div>

        <div
          key="task-count-card"
          className="bg-gray-800 rounded-xl shadow-md p-4 border border-gray-500"
        >
          <h2 className="text-6xl text-white mb-2">{myInfo?.task_count}</h2>
          <p className="text-white mb-2 font-semibold">Tasks</p>
        </div>
      </div>
    </div>
  );
};

export default MyInfoView;
