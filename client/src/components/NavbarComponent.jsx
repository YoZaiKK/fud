import { Link } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { useNavigate } from "react-router-dom";

export const NavbarComponent = () => {
	const navigate = useNavigate();
	return (
		<Container>
			<Navbar>
				<Navbar.Brand> Formato Único de Declaración</Navbar.Brand>
				<Nav>
					<Nav.Link href='/'>
						{/* <Link to="/">Home</Link> */}
						Home
					</Nav.Link>
					<Nav.Link href='/resultados'>
						{/* <Link to="/">Home</Link> */}
						Resultados
					</Nav.Link> 
					{/* papure */}	
					<NavDropdown title="Victima" id="basic-nav-dropdown">
						<NavDropdown.Item href="/new">Registro</NavDropdown.Item>
						<NavDropdown.Divider />
						<NavDropdown.Item href="#action/3.4">
							Separated link
						</NavDropdown.Item>
						<NavDropdown.Item href="/Formulario">Acercamiento NNA</NavDropdown.Item>
					</NavDropdown>
				</Nav>
			</Navbar>
		</Container>
	);
};
