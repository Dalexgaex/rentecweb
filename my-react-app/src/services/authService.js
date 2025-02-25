import axios from "axios";

const API_URL = "https://rentek.onrender.com"; // Reemplaza con la URL real

export const loginUser = async (userData) => {
  return await axios.post(`${API_URL}/login`, userData);
};

export const registerUser = async (userData) => {
  return await axios.post(`${API_URL}/register`, userData);
};
