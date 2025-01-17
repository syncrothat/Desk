import axios from 'axios';
import Token from '../config/Token';

const baseAPIURL = 'https://api.sync2.buxxed.me';

const myProject = `${baseAPIURL}/api/protected/accounts/project`;
const myTask = `${baseAPIURL}/api/protected/accounts/task`;
const myinfo = `${baseAPIURL}/api/protected/accounts/myinfo`;
const myProfile = `${baseAPIURL}/api/protected/profile`;
const projectDetail = `${baseAPIURL}/api/protected/project`;
const projectTask = `${baseAPIURL}/api/protected/task/project`;
const taskCompletion = `${baseAPIURL}/api/protected/task/completed`;

export const fetchProjects = async () => {
  try {
    const token = Token;
    const headers = token ? { Authorization: `Bearer ${token}` } : {};
    const response = await axios.get(myProject, { headers });
    return response.data;
  } catch (error) {
    console.error('Error fetching projects:', error);
    throw error;
  }
};

export const fetchTasks = async () => {
  try {
    const token = Token;
    const headers = token ? { Authorization: `Bearer ${token}` } : {};
    const response = await axios.get(myTask, { headers });
    return response.data;
  } catch (error) {
    console.error('Error fetching tasks:', error);
    throw error;
  }
};

export const fetchMyInfo = async () => {
  try {
    const token = Token;
    const headers = token ? { Authorization: `Bearer ${token}` } : {};
    const response = await axios.get(myinfo, { headers });
    return response.data;
  } catch (error) {
    console.error('Error fetching info:', error);
    throw error;
  }
};

export const fetchUserProfile = async () => {
  try {
    const token = Token;
    const headers = token ? { Authorization: `Bearer ${token}` } : {};
    const response = await axios.get(myProfile, { headers });
    return response.data;
  } catch (error) {
    console.error('Error fetching user profile:', error);
    throw error;
  }
};

export const fetchProjectDetails = async (projectId) => {
  try {
    const token = Token;
    const headers = token ? { Authorization: `Bearer ${token}` } : {};
    const response = await axios.get(`${projectDetail}/${projectId}`, { headers });
    return response.data;
  } catch (error) {
    console.error('Error fetching project details:', error);
    throw error;
  }
};

export const fetchProjectTasks = async (projectId) => {
  try {
    const token = Token;
    const headers = token ? { Authorization: `Bearer ${token}` } : {};
    const response = await axios.get(`${projectTask}/${projectId}`, { headers });
    return response.data;
  } catch (error) {
    console.error('Error fetching project tasks:', error);
    throw error;
  }
};

export const postTasksCompletion = async (taskId) => {
  try {
    const token = Token;
    const headers = token ? { Authorization: `Bearer ${token}` } : {};
    const response = await axios.post(`${taskCompletion}/${taskId}`, {}, { headers });
    return response.data;
  } catch (error) {
    console.error('Error sending task completion request:', error);
    throw error;
  }
};