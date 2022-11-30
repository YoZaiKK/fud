import axios from "axios";

export const deleteTaskRequest = async (id) =>
	await axios.delete(`http://localhost:3000/task/${id}`);

export const getTasksRequest = async (task) =>
	await axios.get("http://localhost:3000/task/");

export const createTaskRequest = async (task) =>
	await axios.post("http://localhost:3000/task/", task);

export const getTaskRequest = async (id) =>
	await axios.get(`http://localhost:3000/task/${id}`);

export const updateTaskRequest = async (id, newFields) =>
	await axios.put(`http://localhost:3000/task/${id}`, newFields);

export const toggleTaskDoneRequest = async (id, done) =>
	await axios.put(`http://localhost:3000/task/${id}`, { done });
