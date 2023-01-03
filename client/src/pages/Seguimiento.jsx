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

export const Seguimiento = () => {
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
      <h1>{params.id ? "Edit Fud" : "Dar seguimiento al proceso de restauración de derechos de un NNA"}</h1>
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
            
                  <Form.Group>
                    <Form.Label>Buscar expediente con el número de caso</Form.Label>
                    <Form.Control
                      type="Text"
                      name="NumeroDeCaso"
                      placeholder="Numero de Caso"
                      onChange={handleChange}
                    />
                    <Form.Label>o Buscar con el CURP de la víctima</Form.Label>
                    <Form.Control
											type="text"
											name="curp"
                      placeholder="CURP"
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