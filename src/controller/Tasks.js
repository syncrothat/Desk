import React, { useEffect, useState } from 'react';
import { fetchTasks } from '../utils/apiService';

const TaskList = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const getTasks = async () => {
      try {
        const data = await fetchTasks();
        setTasks(data.data);
      } catch (error) {
        console.error('Error loading tasks:', error);
      }
    };

    getTasks();
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Tasks</h1>
      <ul>
        {tasks.map((task) => (
          <li key={task.taskid}>
            <h3>{task.task_name}</h3>
            <p>{task.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskList;
