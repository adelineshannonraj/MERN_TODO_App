// src/api/api.js
import axios from "axios";

const API = axios.create({
  baseURL: "/api", // thanks to proxy, no need to write localhost:5000
});

// Fetch tasks
export const fetchTasks = () => API.get("/tasks");

// Add task
export const createTask = (task) => API.post("/tasks", task);

// Delete task
export const deleteTask = (id) => API.delete(`/tasks/${id}`);
