import axios from "axios";

export const deleteTaskRequest = async (id) =>
	await axios.delete(`http://localhost:3000/task/${id}`);

export const getTaskRequest = async (task) =>
	await axios.get("http://localhost:3000/task/");

export const createTaskRequest = async (task) =>
	await axios.post("http://localhost:3000/task/", task);
