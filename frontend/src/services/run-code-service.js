import axios from "axios";

const API_BASE = `${process.env.REACT_APP_API_BASE}`;

export const runCode = async (code) => {
  const response = await axios.post(`${API_BASE}/run`, code);
  return response;
};
