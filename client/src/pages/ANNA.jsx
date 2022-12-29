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

export const ANNA = () => {
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
    var re = /^([A-Z][AEIOUX][A-Z]{2}\d{2}(?:0[1-9]|1[0-2])(?:0[1-9]|[12]\d|3[01])[HM](?:AS|B[CS]|C[CLMSH]|D[FG]|G[TR]|HG|JC|M[CNS]|N[ETL]|OC|PL|Q[TR]|S[PLR]|T[CSL]|VZ|YN|ZS)[B-DF-HJ-NP-TV-Z]{3}[A-Z\d])(\d)$/,
      validado = curp.match(re);

    if (!validado)  //Coincide con el formato general?
      return false;

    //Validar que coincida el dígito verificador
    function digitoVerificador(curp17) {
      //Fuente https://consultas.curp.gob.mx/CurpSP/
      var diccionario = "0123456789ABCDEFGHIJKLMNÑOPQRSTUVWXYZ",
        lngSuma = 0.0,
        lngDigito = 0.0;
      for (var i = 0; i < 17; i++)
        lngSuma = lngSuma + diccionario.indexOf(curp17.charAt(i)) * (18 - i);
      lngDigito = 10 - lngSuma % 10;
      if (lngDigito == 10) return 0;
      return lngDigito;
    }

    if (validado[2] != digitoVerificador(validado[1]))
      return false;

    return true; //Validado
  }
  return (
    <Container>
      <h1>{params.id ? "Edit Fud" : "Formato de Acercamiento con el NNA"}</h1>
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
                <Accordion.Header>Datos del NNA</Accordion.Header>
                <Accordion.Body>
                  <Form.Group>
                    <Form.Label>Nombre completo </Form.Label>
                    <Form.Control
                      type="text"
                      name="nombreRegistrante"
                      placeholder="Nombre(s), Primer apellido, Segundo apellido"
                      onChange={handleChange}
                    />
                  </Form.Group>
                </Accordion.Body>
              </Accordion.Item>

              <Accordion.Item eventKey="2">
                <Accordion.Header>Datos de la Victima</Accordion.Header>
                <Accordion.Body>
                  <Container>
                    <Row>
                      <Form.Label>Tipo de victima</Form.Label>
                    </Row>
                    <Row>
                      <Col>
                        <Form.Label>
                          <Field type="radio" name="tipoVictima" value="directa" />
                          Directa
                        </Form.Label>
                      </Col>
                      <Col >
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
                  </Container>
                  <Form.Group>
                    <Form.Label>Nombre completo </Form.Label>
                    <Form.Control
                      type="text"
                      name="nombreVictima"
                      placeholder="Nombre(s), Primer apellido, Segundo apellido"
                      onChange={handleChange}
                    />
                    <Form.Label>Fecha de nacimiento </Form.Label>
                    <Form.Control
                      type="date"
                      name="fechaNacimiento"
                      onChange={handleChange}
                    />

                    <Form.Label>CURP </Form.Label>
                    <Form.Control
                      type="text"
                      name="curp"
                      placeholder="Nombre(s), Primer apellido, Segundo apellido"
                      onChange={handleChange}
                      onInput={(e) => {
                        console.log(e.target.value)
                        curpValido = (curpValida(e.target.value))
                      }}
                    />
                    <br />
                    {curpValido ?
                      <Alert variant="success">
                        CURP valido
                      </Alert> :
                      <Alert variant="danger">
                        CURP invalido
                      </Alert>
                    }
                    <Row>
                      <Form.Label>Sexo</Form.Label>
                    </Row>
                    <Row>
                      <Col>
                        <Form.Label>
                          <Field type="radio" name="sexo" value="hombre" />
                          Hombre
                        </Form.Label>
                      </Col>
                      <Col >
                        <Form.Label>
                          <Field
                            type="radio"
                            name="sexo"
                            value="mujer"
                          />
                          Mujer
                        </Form.Label>
                      </Col>
                      <Col>
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