import { useEffect, useState } from "react";
import TaskCard from "../components/TaskCard";
import { useTasks } from "../context/TaskContext";

export const TaskPage = function () {
	const { task, loadTask } = useTasks();
	console.log(task);

	useEffect(() => { 
		loadTask(); 
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
