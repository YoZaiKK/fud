import { useFuds } from "../context/FudContext";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";

function FudCard({ fud }) {
	const { deleteFud, toggleFudDone } = useFuds();
	const navigate = useNavigate();
	const handleDone = async (fudDone) => {
		await toggleFudDone(fud.id);
	};
	return (
		<Container
			className="text-center"
			style={{
				width: "18rem",
				margin: "15px",
			}}
		>
			<Card>
				<Card.Body>
					<Card.Title>
						<cite title="Source Title">Title: </cite>
						{fud.title.charAt(0).toUpperCase() + fud.title.slice(1)}
					</Card.Title>
					<Card.Text>
						<cite title="Source Title">description: </cite> {fud.description}
					</Card.Text>
					<Button
						size="sm"
						disabled
						variant={fud.done === 1 ? "primary" : "danger"}
					>
						{fud.done === 1 ? "Status bueno " : " Sin proceso "}
					</Button>
					<br /> <br />
					<div className="d-grid gap-2">
						<Button
							variant="secondary"
							size="sm"
							onClick={() => navigate(`/edit/${fud.id}`)}
						>
							Edit
						</Button>
						<Button
							variant="outline-danger"
							size="sm"
							onClick={() => {
								deleteFud(fud.id);
							}}
						>
							Delete
						</Button>
						<Button
							variant="outline-info"
							size="sm"
							onClick={() => handleDone(fud.done)}
						>
							Toggle Fud status
						</Button>
					</div>
				</Card.Body>
			</Card>
		</Container>
	);
}

export default FudCard;
