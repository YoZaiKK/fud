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
                  <Form.Group>
                    <Form.Label>Registro textual de su reaccion al pedirle dibujar a su familia</Form.Label>
                    <Form.Control
                      type="text"
                      name="textodibujo"
                      placeholder="Ser lo mas consiso posible"
                      onChange={handleChange}
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Registro textual si algo lo molesta o lastima dentro de su entorno familiar</Form.Label>
                    <Form.Control
                      type="text"
                      name="textoentorno"
                      placeholder="Ser lo mas consiso posible"
                      onChange={handleChange}
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Registro textual de su reaccion al pedirle dibujar a su familia</Form.Label>
                    <Form.Control
                      type="text"
                      name="textodibujo"
                      placeholder="Ser lo mas consiso posible"
                      onChange={handleChange}
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Registro de a quien dice o demuestra temer</Form.Label>
                    <Form.Control
                      type="text"
                      name="textotemer"
                      placeholder="Si es mas de uno, separarlo con una coma ',' "
                      onChange={handleChange}
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>¿Qué adulto le resulta signifcativo o quiere tener cerca?</Form.Label>
                    <Form.Control
                      type="text"
                      name="textocerca"
                      placeholder="Si es mas de uno, separarlo con una coma ',' "
                      onChange={handleChange}
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>¿Qué come normalmente?</Form.Label>
                    <Form.Control
                      type="text"
                      name="textocomida"
                      placeholder="Separar las comidas mediante una coma ',' "
                      onChange={handleChange}
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>¿Quien lo cuida la mayor parte del tiempo?</Form.Label>
                    <Form.Control
                      type="text"
                      name="textocomida"
                      placeholder="Si son varias personas, separarlas mediante una coma ',' "
                      onChange={handleChange}
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>¿Cuándo fue la ultima vez que fue al doctor?</Form.Label>
                    <Form.Control
                      type="Date"
                      name="FechaDoctor"
                      placeholder="Fecha"
                      onChange={handleChange}
                    />
                  </Form.Group>
                </Accordion.Body>
              </Accordion.Item>

              <Accordion.Item eventKey="2">
                <Accordion.Header>Datos Complementarios</Accordion.Header>
                <Accordion.Body>
                  <Container>
                  <Form.Group>
                    <Row>
                      <Form.Label>¿Has dejado de ver a alguien que quieres mucho?</Form.Label>
                    </Row>
                    <Row>
                      <Col>
                        <Form.Label>
                          <Field type="radio" name="veralguien" value="Si" />
                          Si
                        </Form.Label>
                      </Col>
                      <Col >
                        <Form.Label>
                          <Field
                            type="radio"
                            name="veralguien"
                            value="No"
                          />
                          No
                        </Form.Label>
                      </Col>
                    </Row>
                    </Form.Group>

                    <Form.Group>
                    <Row>
                      <Form.Label>¿Tiene algún hermano/a que no viva con la familia?</Form.Label>
                    </Row>
                    <Row>
                      <Col>
                        <Form.Label>
                          <Field type="radio" name="hermanoa" value="Si" />
                          Si
                        </Form.Label>
                      </Col>
                      <Col >
                        <Form.Label>
                          <Field
                            type="radio"
                            name="hermanoa"
                            value="No"
                          />
                          No
                        </Form.Label>
                      </Col>
                    </Row>
                    </Form.Group>
                    <Form.Group>
                    <Row>
                      <Form.Label>¿En tu hogar puedes dar tus opiniones libremente?</Form.Label>
                    </Row>
                    <Row>
                      <Col>
                        <Form.Label>
                          <Field type="radio" name="OpinionLibre" value="Si" />
                          Si
                        </Form.Label>
                      </Col>
                      <Col >
                        <Form.Label>
                          <Field
                            type="radio"
                            name="OpinionLibre"
                            value="No"
                          />
                          No
                        </Form.Label>
                      </Col>
                    </Row>
                    </Form.Group>

                    <Form.Group>
                    <Row>
                      <Form.Label>¿Ha visto peleas o cualquier otro tipo de violencia?</Form.Label>
                    </Row>
                    <Row>
                      <Col>
                        <Form.Label>
                          <Field type="radio" name="Peleas" value="Si" />
                          Si
                        </Form.Label>
                      </Col>
                      <Col >
                        <Form.Label>
                          <Field
                            type="radio"
                            name="Peleas"
                            value="No"
                          />
                          No
                        </Form.Label>
                      </Col>
                    </Row>
                    </Form.Group>

                    <Form.Group>
                    <Row>
                      <Form.Label>¿Ha recibido golpes o insultos?</Form.Label>
                    </Row>
                    <Row>
                      <Col>
                        <Form.Label>
                          <Field type="radio" name="GOP" value="Si" />
                          Si
                        </Form.Label>
                      </Col>
                      <Col >
                        <Form.Label>
                          <Field
                            type="radio"
                            name="GOP"
                            value="No"
                          />
                          No
                        </Form.Label>
                      </Col>
                    </Row>
                    </Form.Group>

                    <Form.Group>
                    <Row>
                      <Form.Label>¿Ha estado enfermo?</Form.Label>
                    </Row>
                    <Row>
                      <Col>
                        <Form.Label>
                          <Field type="radio" name="Enfermo" value="Si" />
                          Si
                        </Form.Label>
                      </Col>
                      <Col >
                        <Form.Label>
                          <Field
                            type="radio"
                            name="Enfermo"
                            value="No"
                          />
                          No
                        </Form.Label>
                      </Col>
                    </Row>
                    </Form.Group>

                    <Form.Group>
                    <Row>
                      <Form.Label>¿Fue al doctor?</Form.Label>
                    </Row>
                    <Row>
                      <Col>
                        <Form.Label>
                          <Field type="radio" name="Fdoctor" value="Si" />
                          Si
                        </Form.Label>
                      </Col>
                      <Col >
                        <Form.Label>
                          <Field
                            type="radio"
                            name="Fdoctor"
                            value="No"
                          />
                          No
                        </Form.Label>
                      </Col>
                    </Row>
                    </Form.Group>

                    <Form.Group>
                    <Form.Label>¿A qué hora se duerme?</Form.Label>
                    <Form.Control
                      type="text"
                      name="Horadormir"
                      placeholder="Ingrese la hora en formato de 24 hrs"
                      onChange={handleChange}
                    />
                  </Form.Group>

                  <Form.Group>
                    <Form.Label>¿A qué hora se levanta?</Form.Label>
                    <Form.Control
                      type="text"
                      name="Horadespertar"
                      placeholder="Ingrese la hora en formato de 24 hrs "
                      onChange={handleChange}
                    />
                  </Form.Group>

                  <Form.Group>
                    <Form.Label>¿Cuándo juega?</Form.Label>
                    <Form.Control
                      type="text"
                      name="TextoJuegos"
                      placeholder="Indique en si tiene tiempos libres o si no juega"
                      onChange={handleChange}
                    />
                  </Form.Group>

                    <Form.Group>
                    <Row>
                      <Form.Label>¿Va a la escuela?</Form.Label>
                    </Row>
                    <Row>
                      <Col>
                        <Form.Label>
                          <Field type="radio" name="VEscuela" value="Si" />
                          Si
                        </Form.Label>
                      </Col>
                      <Col >
                        <Form.Label>
                          <Field
                            type="radio"
                            name="VEscuela"
                            value="No"
                          />
                          No
                        </Form.Label>
                      </Col>
                    </Row>
                    </Form.Group>

                    <Form.Group>
                    <Row>
                      <Form.Label>¿Se junta con amigos a jugar o platicar?</Form.Label>
                    </Row>
                    <Row>
                      <Col>
                        <Form.Label>
                          <Field type="radio" name="SAmigos" value="Si" />
                          Si
                        </Form.Label>
                      </Col>
                      <Col >
                        <Form.Label>
                          <Field
                            type="radio"
                            name="SAmigos"
                            value="No"
                          />
                          No
                        </Form.Label>
                      </Col>
                    </Row>
                    </Form.Group>

                    <Form.Group>
                    <Row>
                      <Form.Label>¿Hace algún deporte?</Form.Label>
                    </Row>
                    <Row>
                      <Col>
                        <Form.Label>
                          <Field type="radio" name="Deporte" value="Si" />
                          Si
                        </Form.Label>
                      </Col>
                      <Col >
                        <Form.Label>
                          <Field
                            type="radio"
                            name="Deporte"
                            value="No"
                          />
                          No
                        </Form.Label>
                      </Col>
                    </Row>
                    </Form.Group>

                  </Container>
                  </Accordion.Body>
              </Accordion.Item>
            </Accordion>
            
            
            
            <br/>
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