import { Formik } from "formik";
import { useTasks } from "../context/TaskContext";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export const TaskForm = () => {
	const { createTask, getTask, updateTask } = useTasks();
	const [tasks, setTasks] = useState({
		title: "",
		description: "",
	});
	const navigate = useNavigate();
	const params = useParams();

	useEffect(() => {
		const loadTask = async () => {
			if (params.id) {
				const values = await getTask(params.id);
				console.log(values);
				setTasks({
					title: values.title,
					description: values.description,
				});
			}
		};
		loadTask();
	}, []);

	return (
		<div>
			<h1>{params.id ? "Edit Task" : "Create Task"}</h1>
			<Formik
				initialValues={tasks}
				enableReinitialize={true}
				onSubmit={async (values, actions) => {
					console.log(values);
					params.id
						? await updateTask(params.id, values)
						: await createTask(values);
					setTasks({ title: "", description: "" });  
					navigate("/");
				}}
			>
				{({ handleChange, handleSubmit, values, isSubmitting }) => (
					<form onSubmit={handleSubmit}>
						<label>title</label>
						<input
							type="text"
							name="title"
							placeholder="Write a title"
							onChange={handleChange}
							value={values.title}
						/>

						<label>description</label>
						<textarea
							name="description"
							rows="3"
							placeholder="Write a description"
							onChange={handleChange}
							value={values.description}
						></textarea>

						<button type="submit" disabled={isSubmitting}>
							{isSubmitting ? "Saving..." : "Save"}
						</button>
					</form>
				)}
			</Formik>
		</div>
	);
};
