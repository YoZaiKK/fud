import { createContext, useContext, useState } from "react";
import {
	getTaskRequest,
	deleteTaskRequest,
	createTaskRequest,
} from "../api/task.api";

export const TaskContext = createContext();

export const useTasks = () => {
	const context = useContext(TaskContext);
	if (!context) {
		throw new Error("useTasks must be used within a TaskContextProvider");
	}
	return context;
};

export const TaskContextProvider = ({ children }) => {
	//cargar arreglo de registros
	const [task, setTask] = useState([]);
	async function loadTask() {
		const { data } = await getTaskRequest();
		setTask(data);
	}
	// create reg
	const createTask = async (task) => {
		try {
			await createTaskRequest(task);
		} catch (error) {
			console.error(error);
		}
	};
	// delete reg 
	const deleteTask = async (id) => {
		try {
			await deleteTaskRequest(id);
			setTask(task.filter((task) => task.id !== id)); 
		} catch (e) {
			console.error(e);
		}
	};

	return (
		<TaskContext.Provider value={{ task, loadTask, deleteTask, createTask }}>
			{children}
		</TaskContext.Provider>
	);
};
