// src/apiService.js
import axios from 'axios';
import Token from './Token';

const baseAPIURL = 'https://api.sync.buxxed.me';

let myProject = `${baseAPIURL}/api/protected/accounts/project`;
let myTask = `${baseAPIURL}/api/protected/accounts/task`;

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
