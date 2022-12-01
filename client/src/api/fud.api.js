import axios from "axios";

export const deleteFudRequest = async (id) =>
	await axios.delete(`http://localhost:3000/fud/${id}`);

export const getFudsRequest = async (fud) =>
	await axios.get("http://localhost:3000/fud/");

export const createFudRequest = async (fud) =>
	await axios.post("http://localhost:3000/fud/", fud);

export const getFudRequest = async (id) =>
	await axios.get(`http://localhost:3000/fud/${id}`);

export const updateFudRequest = async (id, newFields) =>
	await axios.put(`http://localhost:3000/fud/${id}`, newFields);

export const toggleFudDoneRequest = async (id, done) =>
	await axios.put(`http://localhost:3000/fud/${id}`, { done });
