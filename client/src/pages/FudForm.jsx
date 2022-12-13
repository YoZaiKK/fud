import { Formik, Field, Form as fm } from "formik";
import { useFuds } from "../context/FudContext";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Accordion from "react-bootstrap/Accordion";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Alert from "react-bootstrap/Alert"; 

export const FudForm = () => {
	const { createFud, getFud, updateFud } = useFuds();
	const [fuds, setFuds] = useState({
		title: "",
		description: "",
	});
	const [contador, setContador] = useState(0);
	// const navigate = useNavigate();
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

	const someFunc = () => {
		setContador(contador + 1);
		console.log(contador + 1);
	};

	return (
		<Container>
			<h1>{params.id ? "Edit Fud" : "Create Fud"}</h1>
			<Formik
				initialValues={fuds}
				enableReinitialize={true}
				onSubmit={async (values, actions) => {
					console.log(values);
					// params.id
					// 	? await updateFud(params.id, values)
					// 	: await createFud(values);
					console.log(fuds);
					setFuds({ title: "", description: "" });
					// navigate("/");
				}}
			>
				{({ handleChange, handleSubmit, values, isSubmitting }) => (
					<Form onSubmit={handleSubmit}>
						{/* trabajando en esto */}
						<Accordion defaultActiveKey="0">
							<Accordion.Item eventKey="0">
								<Accordion.Header>Datos del denunciante</Accordion.Header>
								<Accordion.Body>
									<Container>
										<Row>
											<Form.Label>Registrante</Form.Label>
										</Row>
										<Row>
											<Col>
												<Form.Label>
													<Field type="radio" name="registrante" value="Fam" />
													Familiar
												</Form.Label>
											</Col>
											<Col xs={5}>
												<Form.Label>
													<Field
														type="radio"
														name="registrante"
														value="ServPub"
													/>
													Servidor publico o autoridad
												</Form.Label>
											</Col>
											<Col></Col>
										</Row>
									</Container>
									<Form.Group>
										<Form.Label>Nombre completo </Form.Label>
										<Form.Control
											type="text"
											name="title"
											placeholder="Nombre(s), Primer apellido, Segundo apellido"
											onChange={handleChange}
											value={values.title}
										/>
									</Form.Group>
									{values.registrante == "Fam" ? (
										<Alert>
											<Container>
												<Row>
													<Form.Label>¿Es el tutor de la victima?</Form.Label>
												</Row>
												<Row>
													<Col>
														<Form.Label>
															<Field type="radio" name="tutor" value="Si" />
															Si
														</Form.Label>
													</Col>
													<Col xs={5}>
														<Form.Label>
															<Field type="radio" name="tutor" value="No" />
															No
														</Form.Label>
													</Col>
													<Col></Col>
												</Row>
											</Container>
										</Alert>
									) : (
										<Alert>
											<label>Servidor publico o autoridad</label>
											<Form.Group>
												<Form.Label>Nombre del cargo</Form.Label>
												<Form.Control
													type="text"
													name="cargoServPub"
													placeholder="Jefe de..."
													onChange={handleChange} 
												/>
											</Form.Group>

											<Form.Group>
												<Form.Label>Departamento</Form.Label>
												<Form.Control
													type="text"
													name="depaServPub"
													placeholder="Departamento de..."
													onChange={handleChange} 
												/>
											</Form.Group>
											<br />
										</Alert>
									)}
								</Accordion.Body>
							</Accordion.Item>

							<Accordion.Item eventKey="1">
								<Accordion.Header>Datos de la Victima</Accordion.Header>
								<Accordion.Body>A</Accordion.Body>
							</Accordion.Item>

							<Accordion.Item eventKey="2">
								<Accordion.Header>Relacion con la victima</Accordion.Header>
								<Accordion.Body>A</Accordion.Body>
							</Accordion.Item>

							<Accordion.Item eventKey="3">
								<Accordion.Header>Observaciones</Accordion.Header>
								<Accordion.Body>A</Accordion.Body>
							</Accordion.Item>

							<Accordion.Item eventKey="4">
								<Accordion.Header>Seguimiento de denuncia</Accordion.Header>
								<Accordion.Body>A</Accordion.Body>
							</Accordion.Item>

							<Accordion.Item eventKey="5">
								<Accordion.Header>Informacion adicional</Accordion.Header>
								<Accordion.Body>A</Accordion.Body>
							</Accordion.Item>
						</Accordion>
						<br />
						<Button type="submit" disabled={isSubmitting}>
							{isSubmitting ? "Saving..." : "Acept"}
						</Button>{" "}
						<br /> <br />
						<Button type="button" onClick={someFunc} disabled={isSubmitting}>
							{isSubmitting ? "Saving..." : "Acept "}
							{contador}
						</Button>
					</Form>
				)}
			</Formik>
		</Container>
	);
};
