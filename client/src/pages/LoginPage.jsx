import React from "react";
import { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Alert from "react-bootstrap/Alert";
import { Formik, Field, Form as fm } from "formik";
import { useFuds } from "../context/FudContext";
import { useNavigate } from "react-router-dom";

export const LoginPage = () => {
	const { getUsr } = useFuds();
	const navigate = useNavigate()
	let rfcValido = false;
	const [usr, setUsr] = useState({
		rfc: "",
		contrasena: "",
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
	return (
		<Container>
			<Formik
				initialValues={usr}
				enableReinitialize={true}
				onSubmit={async (values, actions) => {
					let matchPass = await getUsr(values);
					matchPass
					? navigate('/')
					:  console.log("contraseña o usuario incorrecto");

					setUsr({ rfc: "", contrasena: "" });
				}}
			>
				{({ handleChange, handleSubmit, values, isSubmitting }) => (
					<Form onSubmit={handleSubmit}>
						<Card>
							<Card.Header>Login</Card.Header>
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
									</Form.Group>
								</Row>

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
								<Row>
									<Form.Group>
										<Form.Label>Contraseña</Form.Label>
										<Form.Control
											type="password"
											name="contrasena"
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
