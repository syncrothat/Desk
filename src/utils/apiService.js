import axios from 'axios';
import Token from '../config/Token';

const baseAPIURL = 'https://api.sync.buxxed.me';

const myProject = `${baseAPIURL}/api/protected/accounts/project`;
const myTask = `${baseAPIURL}/api/protected/accounts/task`;
const myinfo = `${baseAPIURL}/api/protected/accounts/myinfo`;

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