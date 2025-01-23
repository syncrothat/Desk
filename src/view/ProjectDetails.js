import React, { useEffect, useState, useCallback } from 'react';
import { fetchProjectDetails, fetchProjectTasks, postTasksCompletion, deleteTasks, deleteProjects, fetchMyInfo, fetchUserProfileById } from '../utils/apiService';
import Swal from 'sweetalert2';

const ActionBar = ({ projectId, onBack, onInviteMember, onDeleteProject, project, isAdmin }) => (
  <div className="pb-8">
    <button onClick={onBack} className="mb-4">
      <span className="material-icons sidebar-icons text-md text-gray-500">arrow_back</span>
    </button>
    <div className="text-left">
      <h1 className="pb-4 text-2xl font-bold">{project ? project.project_name : ''}</h1>
      <p className="pb-4 text-gray-500">{project ? project.description : ''}</p>
      <div className="info text-gray-500 flex space-x-4 mb-4">
        <div className="info-item flex items-center">
          <span className="material-icons">person_outline</span>
          <span>{project ? project.members_count : ''}</span>
        </div>
        <div className="info-item flex items-center">
          <span className="material-icons">sort</span>
          <span>{project ? project.tasks_count : ''}</span>
        </div>
      </div>
    </div>
    {isAdmin && (
      <div className="flex space-x-2">
        <button
          className="rounded-full bg-gray-700 text-white px-4 py-2"
          onClick={() => onInviteMember(projectId)}
        >
          <span className="material-icons pr-2">add</span>Invite Member
        </button>
        <button
          className="rounded-full bg-gray-700 text-white px-4 py-2"
          onClick={() => onDeleteProject(projectId)}
        >
          <span className="material-icons pr-2">delete</span>Delete Project
        </button>
      </div>
    )}
  </div>
);

const MembersList = ({ members }) => {
  const [profiles, setProfiles] = useState({});

  useEffect(() => {
    const fetchProfiles = async () => {
      const profilesData = {};
      for (const member of members) {
        const profileData = await fetchUserProfileById(member.userid);
        profilesData[member.userid] = profileData.data;
      }
      setProfiles(profilesData);
    };

    fetchProfiles();
  }, [members]);

  return (
    <div className="w-full md:w-1/4 bg-gray-100 rounded-xl shadow-md mt-4 md:mt-0 md:order-2">
      <h2 className="text-md font-bold mb-3">Project Members</h2>
      <div className="bg-white rounded-xl shadow-md p-4 border border-gray-200">
        <ul className="gap-1">
          {members.map(member => (
            <li key={member.userid} className="mb-2 gap-1">
              <div className="flex items-center gap-1">
                <span className="material-icons pr-2">person</span>
                <div>
                  {profiles[member.userid] ? (
                    <p className="text-gray-700">
                      {profiles[member.userid].first_name} - {member.role}
                      {member.is_admin && <span className="text-xs text-gray-500"> (Admin)</span>}
                    </p>
                  ) : (
                    <p className="text-gray-700">Loading...</p>
                  )}
                </div>
              </div>
              <div className='bg-gray-300 h-0.5 w-full my-2'></div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

const ProjectContent = ({ project, tasks, isAdmin, onCreateTask, onTaskCompletion, onDeleteTask }) => {
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

  const completedTasks = tasks.filter(task => task.is_completed);
  const incompleteTasks = tasks.filter(task => !task.is_completed);

  return (
    <div className="flex flex-col md:flex-row gap-4">
      <div className="w-full md:w-3/4 md:order-1">
        <div key={project ? project.projectid : ''} className="mb-6">
          <h2 className="text-md font-bold mb-3">Incomplete Tasks</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-1">
            {Array.isArray(incompleteTasks) && incompleteTasks.map((task) => (
              <div
                key={task.taskid}
                className="bg-white rounded-xl shadow-md p-4 border border-gray-200 flex flex-col"
              >
                <h3 className="text-lg font-semibold mb-1">{task.title}</h3>
                <p className="text-gray-700 mb-2 break-words">{task.description}</p> {/* Added break-words */}
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
                <div className="info mt-auto flex justify-between">
                  <button onClick={() => onTaskCompletion(task.taskid)} className="flex items-center">
                    <span className="material-icons sidebar-icons text-md">check</span>
                  </button>
                  {isAdmin && (
                    <button onClick={() => onDeleteTask(task.taskid)} className="flex items-center">
                      <span className="material-icons sidebar-icons text-md">delete</span>
                    </button>
                  )}
                </div>
              </div>
            ))}
            {isAdmin && (
              <div
                key="new_project"
                className="bg-slate-50 rounded-xl shadow-md p-4 border text-center cursor-pointer"
                onClick={() => onCreateTask(project.projectid)}
              >
                <h2 className="text-6xl font-semibold">
                  <span className="material-icons">add</span>
                </h2>
                <p className="text-gray-700 font-semibold mb-2">Create new task</p>
              </div>
            )}
          </div>
        </div>
        <div key={`${project ? project.projectid : ''}-completed`} className="mb-6">
          <h2 className="text-md font-bold mb-3">Completed Tasks</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-1">
            {Array.isArray(completedTasks) && completedTasks.map((task) => (
              <div
                key={task.taskid}
                className="bg-white rounded-xl shadow-md p-4 border border-gray-200 flex flex-col"
              >
                <h3 className="text-lg font-semibold mb-1">{task.title}</h3>
                <p className="text-gray-700 mb-2 break-words">{task.description}</p> {/* Added break-words */}
                <p className="text-xs text-gray-500 mb-2">
                  Created At {formatDate(task.created_at)}
                </p>
                <p className="text-xs text-gray-500 mb-2">
                  Completed At {formatDate(task.finished_at)}
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
      <MembersList members={project ? project.members : []} />
    </div>
  );
};

const ProjectDetails = ({ projectId, onBack, onInviteMember, onCreateTask }) => {
  const [project, setProject] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);

  const loadTasks = useCallback(async () => {
    try {
      const taskData = await fetchProjectTasks(projectId);
      setTasks(taskData.data.tasks || []);
    } catch (error) {
      console.error('Error loading tasks:', error);
    }
  }, [projectId]);

  useEffect(() => {
    const getProjectDetails = async () => {
      setError(null);
      try {
        const userInfo = await fetchMyInfo();
        const projectData = await fetchProjectDetails(projectId);
        setProject(projectData.data);

        const currentUser = projectData.data.members.find(member => member.userid === userInfo.userid);
        setIsAdmin(currentUser ? currentUser.is_admin : false);
        await loadTasks();
      } catch (error) {
        if (error.response && (error.response.status === 404 || error.response.status === 500)) {
          setError('Project not found');
        } else {
          console.error('Error loading project details:', error);
        }
      }
    };

    getProjectDetails();
  }, [projectId, loadTasks]);

  const handleTaskCompletion = async (taskId) => {
    try {
      await postTasksCompletion(taskId);
      Swal.fire({
        title: 'Success!',
        text: 'Task completed successfully!',
        icon: 'success',
        confirmButtonText: 'OK'
      });
      await loadTasks();
    } catch (error) {
      console.error('Error completing task:', error);
      Swal.fire({
        title: 'Error!',
        text: 'There was an error completing the task.',
        icon: 'error',
        confirmButtonText: 'OK'
      });
    }
  };

  const handleDeleteTask = async (taskId) => {
    try {
      await deleteTasks(taskId);
      Swal.fire({
        title: 'Success!',
        text: 'Task deleted successfully!',
        icon: 'success',
        confirmButtonText: 'OK'
      });
      await loadTasks();
    } catch (error) {
      console.error('Error deleting task:', error);
      Swal.fire({
        title: 'Error!',
        text: 'There was an error deleting the task.',
        icon: 'error',
        confirmButtonText: 'OK'
      });
    }
  };

  const handleDeleteProject = async (projectId) => {
    try {
      await deleteProjects(projectId);
      Swal.fire({
        title: 'Success!',
        text: 'Project deleted successfully!',
        icon: 'success',
        confirmButtonText: 'OK'
      }).then(() => {
        window.location.reload();
      });
    } catch (error) {
      console.error('Error deleting project:', error);
      Swal.fire({
        title: 'Error!',
        text: 'There was an error deleting the project.',
        icon: 'error',
        confirmButtonText: 'OK'
      });
    }
  };

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <ActionBar
        projectId={projectId}
        onBack={onBack}
        onInviteMember={onInviteMember}
        onDeleteProject={handleDeleteProject}
        project={project}
        isAdmin={isAdmin}
      />
      <ProjectContent
        project={project}
        tasks={tasks}
        isAdmin={isAdmin}
        onCreateTask={onCreateTask}
        onTaskCompletion={handleTaskCompletion}
        onDeleteTask={handleDeleteTask}
      />
    </div>
  );
};

export default ProjectDetails;