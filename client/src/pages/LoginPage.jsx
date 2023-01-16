import React from 'react'
import { useState, useEffect } from 'react'
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import { Formik, Field, Form as fm } from "formik";
import { useFuds } from "../context/FudContext";

export const LoginPage = () => {
  const { getUsr } = useFuds()

  const [usr, setUsr] = useState({
    rfc: "",
    password: "",
  });
  function apretar() {
    console.log("apretado");
  }

  useEffect(() => {
    const loadUsr = async () => {
      if (params.id) {
        const values = await getUsr(params.id);
        console.log(values);
        setUsr({
          rfc: values.rfc,
          password: values.password,
        });
      }
    };
    loadUsr();
  }, []);

  return (
    <Container>
      <Formik
        initialValues={usr}
        // enableReinitialize={true}
        onSubmit={(values, actions) => {
          console.log(values);
          apretar()
        }}
      >{({ handleChange, handleSubmit, values, isSubmitting }) => (
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
                  />
                </Form.Group>
              </Row>
            </Card.Body>
          </Card>
          <Button className='my-2' type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Saving..." : "Acept"}
          </Button>
        </Form>
      )}

      </Formik>
    </Container>
  )
}
