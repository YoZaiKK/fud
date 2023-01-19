import { Link, NavLink } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { useNavigate } from "react-router-dom";

export const NavbarComponent = () => {
	const navigate = useNavigate();
	return (
		<Container>
			<Navbar collapseOnSelect expand="lg" variant="light" bg="light">
				<Navbar.Brand> Formato Único de Declaración</Navbar.Brand>
				<Navbar.Toggle aria-controls="resposive-navbar-nav" />
				<Navbar.Collapse id="resposive-navbar-nav">
					<Nav className="me-auto">
						<Nav.Link as={NavLink} to="/">
							Home
						</Nav.Link>
						<Nav.Link as={NavLink} to="/resultados">
							Resultados
						</Nav.Link>
						<NavDropdown title="Victima" id="basic-nav-dropdown">
							<NavDropdown.Item as={NavLink} to="/new">
								Registro
							</NavDropdown.Item>
							<NavDropdown.Divider />
							<NavDropdown.Item as={NavLink} to="/Seguimiento">
								Dar seguimiento
							</NavDropdown.Item>
							{/*<NavDropdown.Divider />
						<NavDropdown.Item to="/Formulario">Acercamiento NNA</NavDropdown.Item>*/}
						</NavDropdown>
					</Nav>
					<Nav>
						<Nav.Link as={NavLink} to="/login">
							Iniciar sesion
						</Nav.Link>
						<Nav.Link as={NavLink} to="/register">
							Registrarse
						</Nav.Link>
					</Nav>
				</Navbar.Collapse>
			</Navbar>
		</Container>
	);
};
