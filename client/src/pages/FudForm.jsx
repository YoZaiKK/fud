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

export const FudForm = () => {
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
	function variasVictimas({victimas}) {
		let arrayVictimas = [];
		for (let i = 0; i < victimas; i++) {
			arrayVictimas.push(
				<Container className="my-3" key={i}>
					<Card className="px-4 py-2">
						<Card.Title>Datos de victima</Card.Title>
						<Card.Body>
							<Form.Group>
								<Form.Label>Nombre completo de la victima</Form.Label>
								<Form.Control
									type="text"
									name={`nombreVictima${i}`}
									placeholder="Nombre(s), Primer apellido, Segundo apellido"
								/>
							</Form.Group>
							<Form.Group>
								<Form.Label>Relacion con la victima</Form.Label>
								<Form.Control
									type="text"
									name={`relVictima${i}`}
									placeholder="Primo..."
								/>
							</Form.Group>
						</Card.Body>
					</Card>
				</Container>
			);
		}
		return arrayVictimas;
	}
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
									<Form.Label>Registrante</Form.Label>
									<Form.Group>
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
										</Row>
									</Form.Group>
									<Form.Group>
										<Form.Label>Nombre completo </Form.Label>
										<Form.Control
											type="text"
											name="nombreRegistrante"
											placeholder="Nombre(s), Primer apellido, Segundo apellido"
											onChange={handleChange}
										/>
									</Form.Group>
									<br />
									{values.registrante == "Fam" ? (
										<Alert>
											<Form.Label>¿Es el tutor de la victima?</Form.Label>
											<Container>
												<Row>
													<Col>
														<Form.Label>
															<Field type="radio" name="tutor" value="Si" />
															Si
														</Form.Label>
													</Col>
													<Col xs={10}>
														<Form.Label>
															<Field type="radio" name="tutor" value="No" />
															No
														</Form.Label>
													</Col>
												</Row>
											</Container>
										</Alert>
									) : (
										<Alert>
											<Form.Label>
												Datos de servidor publico o autoridad
											</Form.Label>
											<Container>
												<Form.Group>
													<FloatingLabel label="Cargo" className="mb-3">
														<Form.Control
															type="text"
															name="cargoServPub"
															placeholder="Jefe de..."
															onChange={handleChange}
														/>
													</FloatingLabel>
												</Form.Group>

												<Form.Group>
													<FloatingLabel label="Departamento" className="mb-3">
														<Form.Control
															type="text"
															name="depaServPub"
															placeholder="Departamento de..."
															onChange={handleChange}
														/>
													</FloatingLabel>
												</Form.Group>
											</Container>
										</Alert>
									)}
								</Accordion.Body>
							</Accordion.Item>

							<Accordion.Item eventKey="1">
								<Accordion.Header>Datos de la Victima</Accordion.Header>
								<Accordion.Body>
									<Form.Label>Tipo de victima</Form.Label>
									<Form.Group>
										<Row>
											<Col>
												<Form.Label>
													<Field
														type="radio"
														name="tipoVictima"
														value="directa"
													/>
													Directa
												</Form.Label>
											</Col>
											<Col>
												<Form.Label>
													<Field
														type="radio"
														name="tipoVictima"
														value="indirecta"
													/>
													Indirecta
												</Form.Label>
											</Col>
											<Col>
												<Form.Label>
													<Field
														type="radio"
														name="tipoVictima"
														value="potencial"
													/>
													Potencial
												</Form.Label>
											</Col>
										</Row>
									</Form.Group>

									<Form.Group>
										<Form.Label>Nombre completo </Form.Label>
										<Form.Control
											type="text"
											name="nombreVictima"
											placeholder="Nombre(s), Primer apellido, Segundo apellido"
											onChange={handleChange}
										/>
									</Form.Group>
									<Form.Label className="mt-2">Fecha de nacimiento </Form.Label>
									<Form.Group>
										<Form.Control
											type="date"
											name="fechaNacimiento"
											onChange={handleChange}
										/>
									</Form.Group>

									<Form.Group className="my-2">
										<Form.Label>Curp </Form.Label>
										<Form.Control
											type="text"
											name="curp"
											onChange={handleChange}
											onInput={(e) => {
												console.log(e.target.value);
												curpValido = curpValida(e.target.value);
											}}
										/>
									</Form.Group>

									{curpValido ? (
										<Alert variant="success">CURP valido</Alert>
									) : (
										<Alert variant="danger">CURP invalido</Alert>
									)}

									<Form.Label>Sexo</Form.Label>
									<Form.Group>
										<Row>
											<Col>
												<Form.Label>
													<Field type="radio" name="sexo" value="hombre" />
													Hombre
												</Form.Label>
											</Col>
											<Col>
												<Form.Label>
													<Field type="radio" name="sexo" value="mujer" />
													Mujer
												</Form.Label>
											</Col>
											<Col></Col>
										</Row>
									</Form.Group>

									<Form.Label>Lugar de residencia</Form.Label>
									<Container>
										<Form.Group>
											<Row>
												<Col>
													<Form.Label>Calle</Form.Label>
													<Form.Control
														type="text"
														name="calle"
														onChange={handleChange}
													/>
												</Col>
												<Col>
													<Form.Label>Num. Ext.</Form.Label>
													<Form.Control
														type="text"
														name="numExt"
														onChange={handleChange}
													/>
												</Col>
											</Row>
											<Row>
												<Col>
													<Form.Label>Num. Int.</Form.Label>
													<Form.Control
														type="text"
														name="numInt"
														onChange={handleChange}
													/>
												</Col>
												<Col>
													<Form.Label>Colonia</Form.Label>
													<Form.Control
														type="text"
														name="colonia"
														onChange={handleChange}
													/>
												</Col>
											</Row>
											<Row>
												<Col>
													<Form.Label>Código postal</Form.Label>
													<Form.Control
														type="text"
														name="codPos"
														onChange={handleChange}
													/>
												</Col>
												<Col>
													<Form.Label>Telefono</Form.Label>
													<Form.Control
														type="text"
														name="telefono"
														onChange={handleChange}
													/>
												</Col>
											</Row>
											<Row>
												<Col>
													<Form.Label>Localidad</Form.Label>
													<Form.Control
														type="text"
														name="localidad"
														onChange={handleChange}
													/>
												</Col>
												<Col>
													<Form.Label>Delegación o municipio</Form.Label>
													<Form.Control
														type="text"
														name="delegacionR"
														onChange={handleChange}
													/>
												</Col>
											</Row>
											<Row>
												<Col>
													<Form.Label>Entidad federativa</Form.Label>
													<Form.Control
														type="text"
														name="entidadFR"
														onChange={handleChange}
													/>
												</Col>
											</Row>
										</Form.Group>
									</Container>
									<br />
									{values.tipoVictima == "indirecta" ? (
										<Form.Group>
											<InputGroup className="mb-3">
												<InputGroup.Text id="basic-addon1">
													Numero de victimas
												</InputGroup.Text>
												<Form.Control
													type="number"
													name="numVictimas"
													placeholder={
														values.tipoVictima == "indirecta" ? 1 : 0
													}
													onChange={handleChange}
												/>
											</InputGroup>
										</Form.Group>
									) : null}
								</Accordion.Body>
							</Accordion.Item>
							{values.tipoVictima == "indirecta" ? (
								<Accordion.Item eventKey="2">
									<Accordion.Header>Relacion con la victima</Accordion.Header>
									<Accordion.Body>
										{variasVictimas({
											victimas: values.numVictimas,
											handleChange: handleChange,
										})}
									</Accordion.Body>
								</Accordion.Item>
							) : null}

							<Accordion.Item eventKey="3">
								<Accordion.Header>Observaciones</Accordion.Header>
								<Accordion.Body>
									<Form.Label>Tipo daño</Form.Label>
									<Form.Group>
										<Row>
											<Col>
												<Form.Label>
													<Field
														type="checkbox"
														name="tipoDanio"
														value="fisico"
													/>{" "}
													Fisico
												</Form.Label>
											</Col>
											<Col>
												<Form.Label>
													<Field
														type="checkbox"
														name="tipoDanio"
														value="sexual"
													/>{" "}
													Sexual
												</Form.Label>
											</Col>
											<Col>
												<Form.Label>
													<Field
														type="checkbox"
														name="tipoDanio"
														value="psicologico"
													/>{" "}
													Psicologico
												</Form.Label>
											</Col>
										</Row>
									</Form.Group>
									<Form.Group>
										<Form.Label>Descripcion del daño</Form.Label>
										<Form.Control
											as="textarea"
											name="descDanio"
											onChange={handleChange}
										/>
									</Form.Group>
									<Form.Group>
										<Form.Label>Relato de los hechos</Form.Label>
										<Form.Control
											as="textarea"
											name="relatoHechos"
											onChange={handleChange}
										/>
									</Form.Group>
								</Accordion.Body>
							</Accordion.Item>

							<Accordion.Item eventKey="4">
								<Accordion.Header>Seguimiento de denuncia</Accordion.Header>
								<Accordion.Body>
									<Form.Label>¿Ha denunciado?</Form.Label>
									<Form.Group>
										<Row>
											<Col>
												<Form.Label>
													<Field
														type="radio"
														name="alreadyDenuncia"
														value="si"
													/>{" "}
													Si
												</Form.Label>
											</Col>
											<Col>
												<Form.Label>
													<Field
														type="radio"
														name="alreadyDenuncia"
														value="no"
													/>{" "}
													No
												</Form.Label>
											</Col>
										</Row>
									</Form.Group>
									{values.alreadyDenuncia == "si" ? (
										<Container>
											<Form.Label>¿Denuncia Local o federal?</Form.Label>
											<Form.Group>
												<Row>
													<Col>
														<Form.Label>
															<Field
																type="radio"
																name="tipoDenuncia"
																value="local"
															/>{" "}
															Local
														</Form.Label>
													</Col>
													<Col>
														<Form.Label>
															<Field
																type="radio"
																name="tipoDenuncia"
																value="federal"
															/>{" "}
															Dederal
														</Form.Label>
													</Col>
												</Row>
											</Form.Group>
											<Form.Label>¿Tipo de Proceso?</Form.Label>
											<Form.Group>
												<Row>
													<Col>
														<Form.Label>
															<Field
																type="radio"
																name="tipoProcesoDenuncia"
																value="invMinisterial"
															/>{" "}
															Investigacion administrativa
														</Form.Label>
													</Col>
													<Col>
														<Form.Label>
															<Field
																type="radio"
																name="tipoProcesoDenuncia"
																value="procJudicial"
															/>{" "}
															Proceso Juridico
														</Form.Label>
													</Col>
													<Col>
														<Form.Label>
															<Field
																type="radio"
																name="tipoProcesoDenuncia"
																value="procOrgNacional"
															/>{" "}
															Proceso ante organizacion nacional
														</Form.Label>
													</Col>
												</Row>
											</Form.Group>
											<Form.Label className="mt-2">
												Fecha de denuncia
											</Form.Label>
											<Form.Group>
												<Form.Control
													type="date"
													name="fechaDenuncia"
													onChange={handleChange}
												/>
											</Form.Group>
										</Container>
									) : (
										<Container>
											<h2>Link de denuncia</h2>
										</Container>
									)}
								</Accordion.Body>
							</Accordion.Item>

							<Accordion.Item eventKey="5">
								<Accordion.Header>Informacion adicional</Accordion.Header>
								<Accordion.Body>
									<Form.Label>¿La victima es niño o adolescete?</Form.Label>
									<Form.Group>
										<Row>
											<Col>
												<Form.Label>
													<Field
														type="radio"
														name="childOrTeen"
														value="child"
													/>{" "}
													Niño
												</Form.Label>
											</Col>
											<Col>
												<Form.Label>
													<Field type="radio" name="childOrTeen" value="Teen" />{" "}
													Adolescente
												</Form.Label>
											</Col>
										</Row>
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
