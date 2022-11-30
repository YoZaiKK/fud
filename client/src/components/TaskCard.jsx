import { useTasks } from "../context/TaskContext";
import { useNavigate } from "react-router-dom";
function TaskCard({ task }) {
	const { deleteTask, toggleTaskDone } = useTasks();
	const navigate = useNavigate();
	const handleDone = async (taskDone) => {
		await toggleTaskDone(task.id);
	};
	return (
		<div>
			<h2>{task.title}</h2>
			<p>{task.description}</p>
			<span>{task.done === 1 ? "Hecha " : "No hecha:c "}</span>
			<span>{task.createdAt}</span>
			<button
				onClick={() => {
					deleteTask(task.id);
				}}
			>
				Delete
			</button>

			<button onClick={() => navigate(`/edit/${task.id}`)}>Edit</button>
			<button onClick={() => handleDone(task.done)}>Toggle task</button>
		</div>
	);
}

export default TaskCard;
