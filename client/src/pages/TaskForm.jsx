import { Formik } from "formik";
import { useTasks } from "../context/TaskContext";

export const TaskForm = () => {
	const { createTask } = useTasks();
	return (
		<div>
			<Formik
				initialValues={{ title: "", description: "" }}
				onSubmit={async (values, actions) => {
					console.log(values);
					createTask(values);
					actions.resetForm();
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
