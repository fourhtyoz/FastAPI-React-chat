import axios from "axios";

const API_BASE_URL = "http://127.0.0.1:8000";


export const fetchMessages = async () => {
  const response = await axios.get(`${API_BASE_URL}/messages/`);
  return response.data;
};

export const sendMessage = async (content, userId) => {
  const response = await axios.post(`${API_BASE_URL}/messages/`, {
    content,
    user_id: userId,
  });
  return response.data;
};

export const registerUser = async (username, password) => {
  const response = await axios.post(`${API_BASE_URL}/auth/register`, {
    username,
    password,
  });
  return response.data;
};

export const loginUser = async (username, password) => {
  const response = await axios.post(`${API_BASE_URL}/auth/login`, {
    username,
    password,
  });
  return response.data;
};

export const fetchProtectedData = async (token) => {
  const response = await axios.get(`${API_BASE_URL}/auth/me`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};
