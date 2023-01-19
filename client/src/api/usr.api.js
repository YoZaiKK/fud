import axios from "axios";


export const getUsrRequest = async (rfc) =>
    await axios.get(`http://localhost:3000/usr/${rfc}`);

export const deleteUsrRequest = async (rfc) =>
	await axios.delete(`http://localhost:3000/usr/${rfc}`); 

export const createUsrRequest = async (campos) =>
	await axios.post("http://localhost:3000/usr/", campos); 

export const updateUsrRequest = async (rfc, newFields) =>
	await axios.put(`http://localhost:3000/usr/${rfc}`, newFields); 
