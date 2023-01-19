import React from "react";
import { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Alert from "react-bootstrap/Alert";
import { Formik, Field, Form as fm } from "formik";
import { useFuds } from "../context/FudContext";

export const RegisterPage = () => {
	const { createUsr } = useFuds();
	let rfcValido = false;
	let passValido = false;
	const [usr, setUsr] = useState({
		rfc: "",
		nombre: "",
		primer_apellido: "",
		segundo_apellido: "",
		contrasena: "",
		ocupa: "",
	});

	// useEffect(() => {
	// 	const loadUsr = async () => {
	// 		if (params.id) {
	// 			const values = await getUsr(params.rfc);
	// 			console.log(values);
	// 			setUsr({
	// 				rfc: values.rfc,
	// 				contrasena: values.contrasena,
	// 			});
	// 		}
	// 	};
	// 	loadUsr();
	// }, []);
	function validateRFC(rfc) {
		var re =
			/^([A-ZÑ&]{3,4}([0-9]{2})(0[1-9]|1[0-2])(0[1-9]|1[0-9]|2[0-9]|3[0-1]))((-)?([A-Z\d]{3}))?$/;
		return re.test(rfc);
	}
	let validatePass = (pass) => pass.length >= 10;
	return (
		<Container>
			<Formik
				initialValues={usr}
				enableReinitialize={true}
				onSubmit={async (values, actions) => {
					let nuevoUsr = {
						rfc: values.rfc,
						nombre: values.nombre,
						primer_apellido: values.primer_apellido,
						segundo_apellido: values.segundo_apellido,
						contrasena: values.contrasena,
						ocupa: values.ocupa,
					}
          setUsr(nuevoUsr)
					values.contrasena === values.contrasena_conf
						// ? console.log(nuevoUsr)
						? await createUsr(nuevoUsr)
						: console.log("No es la misma pass");
					// params.rfc
					// ? await getUsr(params.id, values)
					// : await createUsr(values);
					// let matchPass = await getUsr(values);
					// setUsr({
					// 	rfc: values.rfc,
					// 	nombre: values.nombre,
					// 	primer_apellido: values.primer_apellido,
					// 	segundo_apellido: values.segundo_apellido,
					// 	contrasena: values.contrasena,
					// 	ocupa: values.ocupa,
					// });
					// console.log(usr);
				}}
			>
				{({ handleChange, handleSubmit, values, isSubmitting }) => (
					<Form onSubmit={handleSubmit}>
						<Card>
							<Card.Header>Register</Card.Header>
							<Card.Body>
								<Row>
									<Form.Group>
										<Form.Label>RFC</Form.Label>
										<Form.Control
											type="text"
											name="rfc"
											placeholder="asdasdasd..."
											onChange={handleChange}
											onInput={(e) => {
												console.log(e.target.value);
												rfcValido = validateRFC(e.target.value);
											}}
										/>
										<Row>
											{rfcValido ? (
												<Alert className="my-3" variant="success">
													RFC valido
												</Alert>
											) : (
												<Alert className="my-3" variant="danger">
													RFC invalido
												</Alert>
											)}
										</Row>
									</Form.Group>
								</Row>
								<Row>
									<Form.Group>
										<Form.Label>nombre</Form.Label>
										<Form.Control
											type="text"
											name="nombre"
											placeholder="asdasdasd..."
											onChange={handleChange}
										/>
									</Form.Group>
								</Row>
								<Row>
									<Form.Group>
										<Form.Label>primer_apellido</Form.Label>
										<Form.Control
											type="text"
											name="primer_apellido"
											placeholder="asdasdasd..."
											onChange={handleChange}
										/>
									</Form.Group>
								</Row>
								<Row>
									<Form.Group>
										<Form.Label>segundo_apellido</Form.Label>
										<Form.Control
											type="text"
											name="segundo_apellido"
											placeholder="asdasdasd..."
											onChange={handleChange}
										/>
									</Form.Group>
								</Row>
								<Form.Label>Tipo de victima</Form.Label>
								<Form.Group>
									<Row>
										<Col>
											<Form.Label>
												<Field type="radio" name="ocupa" value="Abogado" />
												Abogado
											</Form.Label>
										</Col>
										<Col>
											<Form.Label>
												<Field type="radio" name="ocupa" value="Psicologo" />
												Psicologo
											</Form.Label>
										</Col>
										<Col>
											<Form.Label>
												<Field type="radio" name="ocupa" value="TSocial" />
												Trabajador Social
											</Form.Label>
										</Col>
									</Row>
								</Form.Group>
								<Row>
									<Form.Group>
										<Form.Label>Contraseña</Form.Label>
										<Form.Control
											type="password"
											name="contrasena"
											placeholder="asdasdasd..."
											onChange={handleChange}
											onInput={(e) => {
												passValido = validatePass(e.target.value);
											}}
										/>
									</Form.Group>
								</Row>
								{passValido ? (
									<Alert className="my-3" variant="success">
										Contraseña valida
									</Alert>
								) : (
									<Alert className="my-3" variant="danger">
										Contraseña invalida
									</Alert>
								)}
								<Row>
									<Form.Group>
										<Form.Label>Confirmar contraseña</Form.Label>
										<Form.Control
											type="password"
											name="contrasena_conf"
											placeholder="asdasdasd..."
											onChange={handleChange}
										/>
									</Form.Group>
								</Row>
							</Card.Body>
						</Card>
						<Button className="my-2" type="submit" disabled={isSubmitting}>
							{isSubmitting ? "Saving..." : "Acept"}
						</Button>
					</Form>
				)}
			</Formik>
		</Container>
	);
};
