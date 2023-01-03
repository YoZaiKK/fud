import InputGroup from "react-bootstrap/InputGroup";
import FloatingLabel from "react-bootstrap/FloatingLabel";
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
import Card from "react-bootstrap/Card";
import Alert from "react-bootstrap/Alert";
import Dropdown from 'react-bootstrap/Dropdown';


export const IntSuperior = () => {
	const { createFud, getFud, updateFud } = useFuds();
	const [fuds, setFuds] = useState({
		title: "",
		description: "",
	});
	let curpValido = false;
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
	
	//Función para validar una CURP
	function curpValida(curp) {
		var re =
				/^([A-Z][AEIOUX][A-Z]{2}\d{2}(?:0[1-9]|1[0-2])(?:0[1-9]|[12]\d|3[01])[HM](?:AS|B[CS]|C[CLMSH]|D[FG]|G[TR]|HG|JC|M[CNS]|N[ETL]|OC|PL|Q[TR]|S[PLR]|T[CSL]|VZ|YN|ZS)[B-DF-HJ-NP-TV-Z]{3}[A-Z\d])(\d)$/,
			validado = curp.match(re);

		if (!validado)
			//Coincide con el formato general?
			return false;

		//Validar que coincida el dígito verificador
		function digitoVerificador(curp17) {
			//Fuente https://consultas.curp.gob.mx/CurpSP/
			var diccionario = "0123456789ABCDEFGHIJKLMNÑOPQRSTUVWXYZ",
				lngSuma = 0.0,
				lngDigito = 0.0;
			for (var i = 0; i < 17; i++)
				lngSuma = lngSuma + diccionario.indexOf(curp17.charAt(i)) * (18 - i);
			lngDigito = 10 - (lngSuma % 10);
			if (lngDigito == 10) return 0;
			return lngDigito;
		}

		if (validado[2] != digitoVerificador(validado[1])) return false;

		return true; //Validado
	}
	return (
		<Container>
			<h1>{params.id ? "Edit Fud" : "Determinación de interés superior"}</h1>
			<Formik
				initialValues={fuds}
				enableReinitialize={true}
				onSubmit={async (values, actions) => {
					console.log(values);
					console.log(fuds);
					setFuds({ title: "", description: "" });
				}}
			>
				{({ handleChange, handleSubmit, values, isSubmitting }) => (
					<Form onSubmit={handleSubmit}>
						{/* trabajando en esto */}
						<Accordion defaultActiveKey="0">

                    <Accordion.Item eventKey="0">
                        <Accordion.Header>Información administrativa del reporte</Accordion.Header>
                        <Accordion.Body>
                            <Form.Group>
                                <Form.Label>Fecha del reporte</Form.Label>
                                <Form.Control
                                    type="Date"
                                    name="FechaReporte"
                                    placeholder="Fecha"
                                    onChange={handleChange}
                                />
                                <Form.Label>Numero de Reporte</Form.Label>
                                <Form.Control
                                    type="Text"
                                    name="NumeroDeReporte"
                                    placeholder="Numero de Reporte"
                                    onChange={handleChange}
                                />
                                <Form.Label>Nombre del Caso</Form.Label>
                                <Form.Control
                                    type="Text"
                                    name="NombreCaso"
                                    placeholder="Nombre del Caso"
                                    onChange={handleChange}
                                />
                            </Form.Group>
                        </Accordion.Body>
                    </Accordion.Item>
                            
							<Accordion.Item eventKey="1">
								<Accordion.Header>Derechos que requieren medidas urgentes</Accordion.Header>
								<Accordion.Body>
									<Form.Group>
										<Row>
											<Col>
												<Form.Label>
													Derecho
												</Form.Label>
											</Col>
											<Col xs={5}>
                                            <Form.Label>
													Status
												</Form.Label>
											</Col>
										</Row>
                                        </Form.Group>
                                        <br />
                                        <Form.Group>
                                        <Row>
											<Col>
												<Form.Label>
													1.- Primer derecho violentado
												</Form.Label>
											</Col>
											<Col xs={5}>
                                                <Form.Label>
													Restituido
												</Form.Label>
											</Col>
										</Row>
                                    <br />
                                        <Row>
											<Col>
												<Form.Label>
													2.- Segundo derecho violentado
												</Form.Label>
											</Col>
											<Col xs={5}>
                                                <Form.Label>
													En proceso
												</Form.Label>
											</Col>
										</Row>
									</Form.Group>
                                    <br/>
                                    <Form.Group>
										<Row>
											<Col>
												<Form.Label>
                                                ¿Desea agregar otro derecho violentado que requiera medidas urgentes?
												</Form.Label>
											</Col>
											<Col xs={5}>
                                            <Form.Label>
                                                <Field
														type="checkbox"
														name="AgregarDV"
                                                        value="DerVio"
												/>
                                                Agregar
											</Form.Label>
											</Col>
										</Row>
									</Form.Group>
                                    {values.AgregarDV == "DerVio" ? (
                                        <Alert>
                                            <Form.Group>
                                                <Row>
                                                    <Col>
                                                        <Form.Label>
                                                            Seleccione el derecho que requiere una medida urgente
                                                        </Form.Label>
                                                    </Col>
                                                    <Col>
                                                        <Dropdown>
                                                            <Dropdown.Toggle variant="success" id="dropdown-basic">
                                                            Dropdown Button
                                                            </Dropdown.Toggle>

                                                            <Dropdown.Menu>
                                                                <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                                                                <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                                                                <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                                                            </Dropdown.Menu>
                                                    </Dropdown>
                                                    </Col>
                                                </Row>
                                            </Form.Group>
                                        </Alert>
                                    ) : <br/> }
								</Accordion.Body>
							</Accordion.Item>

							<Accordion.Item eventKey="2">
								<Accordion.Header>Tomar medidas urgentes</Accordion.Header>
								<Accordion.Body>
                                    <Form.Group>
                                        <Row>
                                            <Col>
                                                <Form.Label>
                                                    Seleccione el derecho violentado
                                                </Form.Label>
                                            </Col>
                                            <Col>
                                                <Dropdown>
                                                <Dropdown.Toggle variant="success" id="dropdown-basic">
                                                    Dropdown Button
                                                </Dropdown.Toggle>

                                                <Dropdown.Menu>
                                                    <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                                                    <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                                                    <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                                                </Dropdown.Menu>
                                                </Dropdown>
                                            </Col>
                                        </Row>
                                    </Form.Group>
									
									<Form.Group>
										<Form.Label>¿Cúal es la medida tomada?</Form.Label>
										<Form.Control
											as="textarea"
											name="nombreVictima"
											onChange={handleChange}
										/>
									</Form.Group>
									<Form.Label >Fecha de inicio de la medida</Form.Label>
									<Form.Group>
										<Form.Control
											type="date"
											name="fechaNacimiento"
											onChange={handleChange}
										/>
									</Form.Group>
                                    <br />
									<Form.Group>
                                        <Row>
                                            <Col xs={5}>
                                                <Form.Label>¿Le es posible definir cuando concluye la medida? </Form.Label>
                                            </Col>
                                            <Col>
												<Form.Label>
													<Field type="radio" name="defTime" value="si" />
													Si
												</Form.Label>
											</Col>
											<Col>
												<Form.Label>
													<Field type="radio" name="defTime" value="no" />
													No
												</Form.Label>
											</Col>
                                        </Row>
									</Form.Group>
                                    {values.defTime == "si" ? (
                                        <Alert>
                                            <Form.Label >Fecha de cierre de la medida</Form.Label>
										        <Form.Control
											        type="date"
											        name="fechaNacimiento"
											        onChange={handleChange}
										        />
                                            </Alert>) :
                                        (<Alert>
                                            <Form.Label >¿De que depende la fecha de cierre de la medida?</Form.Label>
										        <Form.Control
											        as="textarea"
											        name="DependenciaMed"
											        onChange={handleChange}
										        />
                                            </Alert>)
                                    }
									<Alert>
                                    <Form.Group>
										<Row>
                                            <Col xs={8}>
                                                Con esta medida ¿El NNA podrá seguir manteniendo contacto con sus primos, hermanos, o personas significativas?
                                            </Col>
											<Col>
												<Form.Label>
													<Field type="radio" name="pr1" value="si" />
													Si
												</Form.Label>
											</Col>
											<Col>
												<Form.Label>
													<Field type="radio" name="pr1" value="no" />
													No
												</Form.Label>
											</Col>
											<Col></Col>
										</Row>
									</Form.Group>
                                    </Alert>
                                    {values.pr1 == "no" ?
									(<Alert>
                                    <Form.Group>
										<Row>
                                            <Col xs={8}>
                                                ¿Ha considerado un medio de contacto alternativo?
                                            </Col>
											<Col>
												<Form.Label>
													<Field type="radio" name="pr2" value="si" />
													Si
												</Form.Label>
											</Col>
											<Col>
												<Form.Label>
													<Field type="radio" name="pr2" value="no" />
													No
												</Form.Label>
											</Col>
											<Col></Col>
										</Row>
									</Form.Group>
                                    </Alert>) : null}
                                    <Alert>
                                    <Form.Group>
										<Row>
                                            <Col xs={8}>
                                                ¿Ha considerado si con esta medida no vulnera algún otro derecho?
                                            </Col>
											<Col>
												<Form.Label>
													<Field type="radio" name="pr3" value="si" />
													Si
												</Form.Label>
											</Col>
											<Col>
												<Form.Label>
													<Field type="radio" name="pr3" value="no" />
													No
												</Form.Label>
											</Col>
											<Col></Col>
										</Row>
									</Form.Group>
                                    </Alert>
                                    <Alert>
                                    <Form.Group>
										<Row>
                                            <Col xs={8}>
                                                ¿Se le ha descrito al NNA la necesidad de tomar esta medida?
                                            </Col>
											<Col>
												<Form.Label>
													<Field type="radio" name="pr4" value="si" />
													Si
												</Form.Label>
											</Col>
											<Col>
												<Form.Label>
													<Field type="radio" name="pr5" value="no" />
													No
												</Form.Label>
											</Col>
											<Col></Col>
										</Row>
									</Form.Group>
                                    </Alert>
                                    <Alert>
                                    <Form.Group>
										<Row>
                                            <Col xs={8}>
                                                ¿Se aseguró de que el NNA comprendiera lo que implica?
                                            </Col>
											<Col>
												<Form.Label>
													<Field type="radio" name="pr6" value="si" />
													Si
												</Form.Label>
											</Col>
											<Col>
												<Form.Label>
													<Field type="radio" name="pr6" value="no" />
													No
												</Form.Label>
											</Col>
											<Col></Col>
										</Row>
									</Form.Group>
                                    </Alert>
                                    <Form.Group>
                                    <Form.Label >¿Que opina el NNA sobre la medida urgente de protección?</Form.Label>
										        <Form.Control
											        as="textarea"
											        name="OpinionMed"
											        onChange={handleChange}
										        />
                                    </Form.Group>
								</Accordion.Body>
							</Accordion.Item>
						</Accordion>
						<br />
						<Button type="submit" disabled={isSubmitting}>
							{isSubmitting ? "Saving..." : "Acept"}
						</Button>{" "}
						<br /> <br />
					</Form>
				)}
			</Formik>
		</Container>
	);
};
