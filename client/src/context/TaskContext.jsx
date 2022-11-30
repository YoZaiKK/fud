import { createContext, useContext, useState } from "react";
import {
	getTasksRequest,
	deleteTaskRequest,
	createTaskRequest,
	getTaskRequest,
	updateTaskRequest,
	toggleTaskDoneRequest,
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
		const { data } = await getTasksRequest();
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
	// get single reg by id
	const getTask = async (id) => {
		try {
			const response = await getTaskRequest(id);
			// setTask(task.filter((task) => task.id !== id));
			return response.data;
		} catch (e) {
			console.error(e);
		}
	};

	const updateTask = async (id, newFields) => {
		try {
			const response = await updateTaskRequest(id, newFields);
			console.log(response);
		} catch (e) {
			console.error(e);
		}
	};

	const toggleTaskDone = async (id) => {
		try {
			const taskFound = task.find((task) => task.id === id);
			await toggleTaskDoneRequest(id, taskFound.done === 0 ? 1 : 0);
			setTask(
				task.map((task) =>
					task.id === id ? { ...task, done: task.done ? 0 : 1 } : task
				)
			);
		} catch (e) {
			console.error(e);
		}
	};

	return (
		<TaskContext.Provider
			value={{
				task,
				loadTask,
				deleteTask,
				createTask,
				getTask,
				updateTask,
				toggleTaskDone,
			}}
		>
			{children}
		</TaskContext.Provider>
	);
};
