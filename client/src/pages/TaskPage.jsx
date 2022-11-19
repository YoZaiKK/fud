import { useEffect, useState } from "react";
import { getTaskRequest } from "../api/task.api";
import TaskCard from "../components/TaskCard";
export const TaskPage = function () {
	const [task, setTask] = useState([]);

	useEffect(() => {
		async function loadTask() {
			const { data } = await getTaskRequest();
			setTask(data);
		}
		loadTask();
		console.log("Task Page");
	}, []);
	function renderMain() {
		if (task.length === 0) return <h2>No tasks yet</h2>;
		return task.map((task) => <TaskCard task={task} key={task.id} />);
	}
	return (
		<div>
			<h1>Tareas</h1>
			{renderMain()}
		</div>
	);
};
