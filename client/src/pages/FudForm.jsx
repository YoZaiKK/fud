import { Formik } from "formik";
import { useFuds } from "../context/FudContext";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";

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
		<Container>
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
					<Form onSubmit={handleSubmit}>
						<Form.Group>
							<Form.Label>Primer campo</Form.Label>
							<Form.Control
								type="text"
								name="title"
								placeholder="Llena este campo"
								onChange={handleChange}
								value={values.title}
							/>
						</Form.Group>

						<Form.Group>
							<Form.Label>Primer descripcion</Form.Label>
							<Form.Control as="textarea"
								name="description"
								rows="3"
								placeholder="Inttroduce una descripcion"
								onChange={handleChange}
								value={values.description}
							/> 
						</Form.Group>
					<br />
						<Button type="submit" disabled={isSubmitting}>
							{isSubmitting ? "Saving..." : "Acept"}
						</Button>
					</Form>
				)}
			</Formik>
		</Container>
	);
};
