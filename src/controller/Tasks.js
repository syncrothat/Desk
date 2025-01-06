import React, { useEffect, useState } from 'react';
import { fetchTasks } from '../utils/apiService';

const TaskList = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const getTasks = async () => {
      try {
        const data = await fetchTasks();
        // The API response has a structure with `data` containing projects and their tasks.
        const projectData = Object.keys(data.data).map((key) => ({
          projectID: key,
          projectName: data.data[key].projectName,
          tasks: data.data[key].tasks,
        }));
        setProjects(projectData);
      } catch (error) {
        console.error('Error loading tasks:', error);
      }
    };

    getTasks();
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">My Tasks</h1>
      {projects.map((project) => (
        <div key={project.projectID} className="mb-6">
          <h2 className="text-xl font-bold mb-3">{project.projectName}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {project.tasks.map((task) => (
              <div
                key={task.taskid}
                className="bg-white rounded-xl shadow-md p-4 border border-gray-200"
              >
                <h3 className="text-lg font-semibold mb-2">{task.title}</h3>
                <p className="text-gray-700 mb-2">{task.description}</p>
                <p className="text-sm text-gray-500">Deadline: {new Date(task.deadline).toLocaleDateString()}</p>
                <p className="text-sm text-gray-500">Created At: {new Date(task.created_at).toLocaleDateString()}</p>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default TaskList;
