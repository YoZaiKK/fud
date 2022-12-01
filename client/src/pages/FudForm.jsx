import { Formik } from "formik";
import { useFuds } from "../context/FudContext";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export const FudForm = () => {
	const { createFud, getFud, updateFud } = useFuds();
	const [fuds, setFuds] = useState({
		title: "",
		description: "",
	});
	const navigate = useNavigate();
	const params = useParams();

	useEffect(() => {
		const loadFud = async () => {
			if (params.id) {
				const values = await getFud(params.id);
				console.log(values);
				setFuds({
					title: values.title,
					description: values.description,
				});
			}
		};
		loadFud();
	}, []);

	return (
		<div>
			<h1>{params.id ? "Edit Fud" : "Create Fud"}</h1>
			<Formik
				initialValues={fuds}
				enableReinitialize={true}
				onSubmit={async (values, actions) => {
					console.log(values);
					params.id
						? await updateFud(params.id, values)
						: await createFud(values);
					setFuds({ title: "", description: "" });  
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
