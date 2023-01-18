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

export const AcercamientoFam = () => {
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
      <h1>{params.id ? "Edit Fud" : "Formato de registro del acercamiento con la familia"}</h1>
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
                <Accordion.Header>Lugar, fecha y numero de reporte</Accordion.Header>
                <Accordion.Body>
                  <Form.Group>
                    <Form.Label>Fecha del reporte</Form.Label>
                    <Form.Control
                      type="Date"
                      name="fecha_reporte"
                      placeholder="Fecha"
                      onChange={handleChange}
                    />
                    <Form.Label>Numero de Reporte</Form.Label>
                    <Form.Control
                      type="Text"
                      name="numero_reporte"
                      placeholder="Numero de Reporte"
                      onChange={handleChange}
                    />
                    <Form.Label>Estado</Form.Label>
                    <Form.Control
                      type="Text"
                      name="Estado"
                      placeholder="Estado"
                      onChange={handleChange}
                    /><Form.Label>Municipio</Form.Label>
                    <Form.Control
                      type="text"
                      name="municipio"
                      placeholder="Municipio"
                      onChange={handleChange}
                    />
                  </Form.Group>
                </Accordion.Body>
              </Accordion.Item>

              <Accordion.Item eventKey="1">
                <Accordion.Header>Pesonas adultas responsables del NNA</Accordion.Header>
                <Accordion.Body>
                  <Form.Group>
                    <Form.Label>Nombre completo </Form.Label>
                    <Form.Control
                      type="text"
                      name="nombre_responsable"
                      placeholder="Nombre(s), Primer apellido, Segundo apellido"
                      onChange={handleChange}
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Parentesco</Form.Label>
                    <Form.Control
                      type="text"
                      name="parentesco_responsable"
                      placeholder="Elegir una opcion"
                      onChange={handleChange}
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Maximo grado de estudios</Form.Label>
                    <Form.Control
                      type="text"
                      name="grado_estudio"
                      placeholder="Elegir una opcion"
                      onChange={handleChange}
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Edad</Form.Label>
                    <Form.Control
                      type="text"
                      name="edad_responsable"
                      placeholder="Elegir una opcion"
                      onChange={handleChange}
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Ocupacion</Form.Label>
                    <Form.Control
                      type="text"
                      name="ocupacion_responsable"
                      placeholder="Escribir a que se dedica"
                      onChange={handleChange}
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Genero</Form.Label>
                    <Form.Control
                      type="text"
                      name="genero_responsable"
                      placeholder="Elegir una opcion"
                      onChange={handleChange}
                    />
                  </Form.Group>
                </Accordion.Body>
              </Accordion.Item>

              <Accordion.Item eventKey="2">
                <Accordion.Header>Informaion aportada sobre vinculos familiares</Accordion.Header>
                <Accordion.Body>
                  <Container>
                  <Form.Group>
                    <Row>
                      <Form.Label>¿El NNA convive con la familia del padre?</Form.Label>
                    </Row>
                    <Row>
                      <Col>
                        <Form.Label>
                          <Field type="radio" name="con_fam_padre" value="Si" />
                          Si
                        </Form.Label>
                      </Col>
                      <Col >
                        <Form.Label>
                          <Field
                            type="radio"
                            name="con_fam_padre"
                            value="No"
                          />
                          No
                        </Form.Label>
                      </Col>
                    </Row>
                    </Form.Group>

                    <Form.Group>
                    <Row>
                      <Form.Label>¿El NNA convive con la familia de la madre?</Form.Label>
                    </Row>
                    <Row>
                      <Col>
                        <Form.Label>
                          <Field type="radio" name="con_fam_madre" value="Si" />
                          Si
                        </Form.Label>
                      </Col>
                      <Col >
                        <Form.Label>
                          <Field
                            type="radio"
                            name="con_fam_madre"
                            value="No"
                          />
                          No
                        </Form.Label>
                      </Col>
                    </Row>
                    </Form.Group>
                    <Form.Group>
                    <Row>
                      <Form.Label>¿El NNA participa en algun grupo de socializacion?</Form.Label>
                    </Row>
                    <Row>
                      <Col>
                        <Form.Label>
                          <Field type="radio" name="grupo_socializacion" value="Si" />
                          Si
                        </Form.Label>
                      </Col>
                      <Col >
                        <Form.Label>
                          <Field
                            type="radio"
                            name="grupo_socializacion"
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
            
            <Accordion.Item eventKey="3">
                <Accordion.Header>Informaion adicional sobre los adultos responsables</Accordion.Header>
                <Accordion.Body>
                  <Container>

                  <Form.Group>
                    <Form.Label>Con quien vive el responsable del NNA</Form.Label>
                    <Form.Control
                      type="text"
                      name="vive_con_responsable"
                      placeholder="Elegir una opcion"
                      onChange={handleChange}
                    />
                  </Form.Group>

                  <Form.Group>
                    <Form.Label>Con quien convive el responsable del NNA</Form.Label>
                    <Form.Control
                      type="text"
                      name="convive_con_responsable"
                      placeholder="Elegir una opcion"
                      onChange={handleChange}
                    />
                  </Form.Group>
                    <Form.Group>
                    <Row>
                      <Form.Label>¿El responsable es migrante?</Form.Label>
                    </Row>
                    <Row>
                      <Col>
                        <Form.Label>
                          <Field type="radio" name="migrante_responsable" value="Si" />
                          Si
                        </Form.Label>
                      </Col>
                      <Col >
                        <Form.Label>
                          <Field
                            type="radio"
                            name="migrante_responsable"
                            value="No"
                          />
                          No
                        </Form.Label>
                      </Col>
                    </Row>
                    </Form.Group>

                    <Form.Group>
                    <Form.Label>Razon de la migracion</Form.Label>
                    <Form.Control
                      type="text"
                      name="razon_migracion"
                      placeholder="Escribir la razon de la migracion"
                      onChange={handleChange}
                    />
                  </Form.Group>

                  <Form.Group>
                    <Row>
                      <Form.Label>¿El NNA paticia en la migracion?</Form.Label>
                    </Row>
                    <Row>
                      <Col>
                        <Form.Label>
                          <Field type="radio" name="nna_participa_migra" value="Si" />
                          Si
                        </Form.Label>
                      </Col>
                      <Col >
                        <Form.Label>
                          <Field
                            type="radio"
                            name="nna_participa_migra"
                            value="No"
                          />
                          No
                        </Form.Label>
                      </Col>
                    </Row>
                    </Form.Group>

                    <Form.Group>
                    <Row>
                      <Form.Label>¿Padece alguna enfermedad cronica?</Form.Label>
                    </Row>
                    <Row>
                      <Col>
                        <Form.Label>
                          <Field type="radio" name="enfermedad_croni" value="Si" />
                          Si
                        </Form.Label>
                      </Col>
                      <Col >
                        <Form.Label>
                          <Field
                            type="radio"
                            name="enfermedad_croni"
                            value="No"
                          />
                          No
                        </Form.Label>
                      </Col>
                    </Row>
                    </Form.Group>

                    <Form.Group>
                    <Form.Label>¿Cuál?</Form.Label>
                    <Form.Control
                      type="text"
                      name="enfermedad_cronica"
                      placeholder="Escriba que enfermedad cronica padece"
                      onChange={handleChange}
                    />
                  </Form.Group>

                  <Form.Group>
                    <Row>
                      <Form.Label>¿Perteneca a alguna comunidad indigena?</Form.Label>
                    </Row>
                    <Row>
                      <Col>
                        <Form.Label>
                          <Field type="radio" name="comunidad_indi" value="Si" />
                          Si
                        </Form.Label>
                      </Col>
                      <Col >
                        <Form.Label>
                          <Field
                            type="radio"
                            name="comunidad_indi"
                            value="No"
                          />
                          No
                        </Form.Label>
                      </Col>
                    </Row>
                    </Form.Group>

                    <Form.Group>
                    <Form.Label>¿Cuál?</Form.Label>
                    <Form.Control
                      type="text"
                      name="comunidad_indigena"
                      placeholder="Escriba a que comunidad indigena pertenece"
                      onChange={handleChange}
                    />
                  </Form.Group>

                  </Container>
                  </Accordion.Body>
              </Accordion.Item>

              <Accordion.Item eventKey="4">
                <Accordion.Header>Información del NNA aportada por la familia durante el dialogo experimental</Accordion.Header>
                <Accordion.Body>
                  <Container>

                  <Form.Group>
                    <Row>
                      <Form.Label>¿Esta registrado en el registro civil?</Form.Label>
                    </Row>
                    <Row>
                      <Col>
                        <Form.Label>
                          <Field type="radio" name="registro_civil" value="Si" />
                          Si
                        </Form.Label>
                      </Col>
                      <Col >
                        <Form.Label>
                          <Field
                            type="radio"
                            name="registro_civil"
                            value="No"
                          />
                          No
                        </Form.Label>
                      </Col>
                    </Row>
                    </Form.Group>

                    <Form.Group>
                    <Row>
                      <Form.Label>¿Tiene acta de nacimiento?</Form.Label>
                    </Row>
                    <Row>
                      <Col>
                        <Form.Label>
                          <Field type="radio" name="acta_nac" value="Si" />
                          Si
                        </Form.Label>
                      </Col>
                      <Col >
                        <Form.Label>
                          <Field
                            type="radio"
                            name="acta_nac"
                            value="No"
                          />
                          No
                        </Form.Label>
                      </Col>
                    </Row>
                    </Form.Group>

                    <Form.Group>
                    <Row>
                      <Form.Label>¿La opinion del NNA es considerada y tomada en cuenta?</Form.Label>
                    </Row>
                    <Row>
                      <Col>
                        <Form.Label>
                          <Field type="radio" name="opinion_nna" value="Si" />
                          Si
                        </Form.Label>
                      </Col>
                      <Col >
                        <Form.Label>
                          <Field
                            type="radio"
                            name="opinion_nna"
                            value="No"
                          />
                          No
                        </Form.Label>
                      </Col>
                    </Row>
                    </Form.Group>

                    <Form.Group>
                    <Row>
                      <Form.Label>¿Alguien lo cuida la mayor parte del tiempo?</Form.Label>
                    </Row>
                    <Row>
                      <Col>
                        <Form.Label>
                          <Field type="radio" name="cuidar_nna" value="Si" />
                          Si
                        </Form.Label>
                      </Col>
                      <Col >
                        <Form.Label>
                          <Field
                            type="radio"
                            name="cuidar_nna"
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
                          <Field type="radio" name="golpe_insulto" value="Si" />
                          Si
                        </Form.Label>
                      </Col>
                      <Col >
                        <Form.Label>
                          <Field
                            type="radio"
                            name="golpe_insulto"
                            value="No"
                          />
                          No
                        </Form.Label>
                      </Col>
                    </Row>
                    </Form.Group>

                    <Form.Group>
                    <Row>
                      <Form.Label>¿Come tres veces al dia?</Form.Label>
                    </Row>
                    <Row>
                      <Col>
                        <Form.Label>
                          <Field type="radio" name="comidas_al_dia" value="Si" />
                          Si
                        </Form.Label>
                      </Col>
                      <Col >
                        <Form.Label>
                          <Field
                            type="radio"
                            name="comidas_al_dia"
                            value="No"
                          />
                          No
                        </Form.Label>
                      </Col>
                    </Row>
                    </Form.Group>

                    <Form.Group>
                    <Row>
                      <Form.Label>¿Tiene cartilla de vacunacion?</Form.Label>
                    </Row>
                    <Row>
                      <Col>
                        <Form.Label>
                          <Field type="radio" name="cartilla_vac" value="Si" />
                          Si
                        </Form.Label>
                      </Col>
                      <Col >
                        <Form.Label>
                          <Field
                            type="radio"
                            name="cartilla_vac"
                            value="No"
                          />
                          No
                        </Form.Label>
                      </Col>
                    </Row>
                    </Form.Group>

                    <Form.Group>
                    <Row>
                      <Form.Label>¿Tiene seguro medico de algun tipo?</Form.Label>
                    </Row>
                    <Row>
                      <Col>
                        <Form.Label>
                          <Field type="radio" name="seg_medico" value="Si" />
                          Si
                        </Form.Label>
                      </Col>
                      <Col >
                        <Form.Label>
                          <Field
                            type="radio"
                            name="seg_medico"
                            value="No"
                          />
                          No
                        </Form.Label>
                      </Col>
                    </Row>
                    </Form.Group>

                    <Form.Group>
                    <Row>
                      <Form.Label>¿Requiere aditamentos (silla de ruedas, muletas, etc.)?</Form.Label>
                    </Row>
                    <Row>
                      <Col>
                        <Form.Label>
                          <Field type="radio" name="aditamento_adic" value="Si" />
                          Si
                        </Form.Label>
                      </Col>
                      <Col >
                        <Form.Label>
                          <Field
                            type="radio"
                            name="aditamento_adic"
                            value="No"
                          />
                          No
                        </Form.Label>
                      </Col>
                    </Row>
                    </Form.Group>

                    <Form.Group>
                    <Row>
                      <Form.Label>¿Va a la escuela?</Form.Label>
                    </Row>
                    <Row>
                      <Col>
                        <Form.Label>
                          <Field type="radio" name="va_escuela" value="Si" />
                          Si
                        </Form.Label>
                      </Col>
                      <Col >
                        <Form.Label>
                          <Field
                            type="radio"
                            name="va_escuela"
                            value="No"
                          />
                          No
                        </Form.Label>
                      </Col>
                    </Row>
                    </Form.Group>

                    <Form.Group>
                    <Row>
                      <Form.Label>¿Hace algun deporte?</Form.Label>
                    </Row>
                    <Row>
                      <Col>
                        <Form.Label>
                          <Field type="radio" name="practica_deporte" value="Si" />
                          Si
                        </Form.Label>
                      </Col>
                      <Col >
                        <Form.Label>
                          <Field
                            type="radio"
                            name="practica_deporte"
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

              <Accordion.Item eventKey="5">
                <Accordion.Header>Observaciones sobre el grado de negociacion y afeccion emocional del adulto</Accordion.Header>
                <Accordion.Body>
                  <Container>
                  <Form.Group>
                    <Row>
                      <Form.Label>¿Es cooperativo al responder las preguntas?</Form.Label>
                    </Row>
                    <Row>
                      <Col>
                        <Form.Label>
                          <Field type="radio" name="cooperativo" value="Si" />
                          Si
                        </Form.Label>
                      </Col>
                      <Col >
                        <Form.Label>
                          <Field
                            type="radio"
                            name="cooperativo"
                            value="No"
                          />
                          No
                        </Form.Label>
                      </Col>
                    </Row>
                    </Form.Group>
                    <Form.Group>
                    <Row>
                      <Form.Label>¿Muestra interes en el NNA?</Form.Label>
                    </Row>
                    <Row>
                      <Col>
                        <Form.Label>
                          <Field type="radio" name="interes_en_nna" value="Si" />
                          Si
                        </Form.Label>
                      </Col>
                      <Col >
                        <Form.Label>
                          <Field
                            type="radio"
                            name="interes_en_nna"
                            value="No"
                          />
                          No
                        </Form.Label>
                      </Col>
                    </Row>
                    </Form.Group>
                    <Form.Group>
                    <Row>
                      <Form.Label>¿Sus respuestas son claras y concisas?</Form.Label>
                    </Row>
                    <Row>
                      <Col>
                        <Form.Label>
                          <Field type="radio" name="claro_conciso" value="Si" />
                          Si
                        </Form.Label>
                      </Col>
                      <Col >
                        <Form.Label>
                          <Field
                            type="radio"
                            name="claro_conciso"
                            value="No"
                          />
                          No
                        </Form.Label>
                      </Col>
                    </Row>
                    </Form.Group>
                    <Form.Group>
                    <Row>
                      <Form.Label>¿Es consciente de la situacion del NNA?</Form.Label>
                    </Row>
                    <Row>
                      <Col>
                        <Form.Label>
                          <Field type="radio" name="conciente_situ" value="Si" />
                          Si
                        </Form.Label>
                      </Col>
                      <Col >
                        <Form.Label>
                          <Field
                            type="radio"
                            name="conciente_situ"
                            value="No"
                          />
                          No
                        </Form.Label>
                      </Col>
                    </Row>
                    </Form.Group>
                    <Form.Group>
                    <Row>
                      <Form.Label>¿Se muestra preocupado por la situaion del NNA?</Form.Label>
                    </Row>
                    <Row>
                      <Col>
                        <Form.Label>
                          <Field type="radio" name="preocupado" value="Si" />
                          Si
                        </Form.Label>
                      </Col>
                      <Col >
                        <Form.Label>
                          <Field
                            type="radio"
                            name="preocupado"
                            value="No"
                          />
                          No
                        </Form.Label>
                      </Col>
                    </Row>
                    </Form.Group>
                    <Form.Group>
                    <Form.Label>Observaciones adicionales</Form.Label>
                    <Form.Control
                      type="text"
                      name="observaciones_ad"
                      placeholder="Escribir las observaciones adicionales"
                      onChange={handleChange}
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Narracion general de los hechos</Form.Label>
                    <Form.Control
                      type="text"
                      name="narracion_gen"
                      placeholder="Escribir la narracion general de los hechos"
                      onChange={handleChange}
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Idenetificador de quien llena este documento</Form.Label>
                    <Form.Control
                      type="text"
                      name="identificador"
                      placeholder="Identificador"
                      onChange={handleChange}
                    />
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