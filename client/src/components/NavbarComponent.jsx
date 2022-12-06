import { Link } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { useNavigate } from "react-router-dom";

export const NavbarComponent = () => {
	const navigate = useNavigate();
	return (
		<Navbar>
			<Navbar.Brand> Formato Único de Declaración</Navbar.Brand>
			<Nav>
				<Nav.Link>
					<Link to="/">Home</Link>
				</Nav.Link>
				<Nav.Link>
					<Link to="/new">Create task</Link>
				</Nav.Link>
			</Nav>
		</Navbar>
	);
};
