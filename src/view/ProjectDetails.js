import React, { useEffect, useState } from 'react';
import { fetchProjectDetails, fetchProjectTasks } from '../utils/apiService';

const ProjectDetails = ({ projectId, onBack, onInviteMember }) => {
  const [project, setProject] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getProjectDetails = async () => {
      setError(null);
      try {
        const projectData = await fetchProjectDetails(projectId);
        setProject(projectData.data);
        const taskData = await fetchProjectTasks(projectId);
        setTasks(taskData.data.tasks || []);
      } catch (error) {
        if (error.response && (error.response.status === 404 || error.response.status === 500)) {
          setError('Project not found');
        } else {
          console.error('Error loading project details:', error);
        }
      }
    };

    getProjectDetails();
  }, [projectId]);

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const isDeadlineNear = (deadline) => {
    const deadlineDate = new Date(deadline);
    const now = new Date();
    const diff = deadlineDate - now;
    return diff < 7 * 24 * 60 * 60 * 1000;
  };

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <div className="pb-8">
        <button onClick={onBack}>
          <span className="material-icons sidebar-icons text-md text-gray-500">arrow_back</span>
        </button>
      </div>
      <div className="pb-4">
        <h1 className="text-2xl font-bold">
          {project ? project.project_name : ''}
        </h1>
      </div>
      <div>
        <p className="pb-4 text-gray-500">{project ? project.description : ''}</p>
        <div className="info text-gray-500 pb-8">
          <div className="info-item">
            <span className="material-icons">person_outline</span>
            <span>{project ? project.members_count : ''}</span>
          </div>
          <div className="info-item">
            <span className="material-icons">sort</span>
            <span>{project ? project.tasks_count : ''}</span>
          </div>
          <div className="info-item">
            <span className="material-icons">edit</span>
            <span>{project ? formatDate(project.created_at) : ''}</span>
          </div>
          <div className="info-item">
            <span className="material-icons">update</span>
            <span>{project ? formatDate(project.updated_at) : ''}</span>
          </div>
        </div>
        <div className="pb-8">
          <button
            className="rounded-full bg-gray-700 text-white px-4 py-2"
            onClick={() => onInviteMember(projectId)}
          >
            <span className="material-icons pr-2">add</span>Invite Member
          </button>
        </div>
        <div key={project ? project.projectid : ''} className="mb-6">
          <h2 className="text-md font-bold mb-3">Tasks</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {Array.isArray(tasks) && tasks.map((task) => (
              <div
                key={task.taskid}
                className="bg-white rounded-xl shadow-md p-4 border border-gray-200"
              >
                <h3 className="text-lg font-semibold mb-1">{task.title}</h3>
                <p className="text-gray-700 mb-2">{task.description}</p>
                <p className="text-xs text-gray-500 mb-2">
                  Created At {formatDate(task.created_at)}
                </p>
                <p
                  className={`text-xs ${
                    isDeadlineNear(task.deadline) ? 'text-red-500' : 'text-gray-500'
                  }`}
                >
                  Deadline {formatDate(task.deadline)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetails;