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
		<Container>
			<Card style={{ width: "18rem" }}>
				<Card.Body>
					<Card.Title>
						{" "}
						<cite title="Source Title">Title: </cite> {fud.title.toUpperCase()}
					</Card.Title>
					<Card.Text>
						{" "}
						<cite title="Source Title">description: </cite> {fud.description}
					</Card.Text>
					<Button
						size="sm"
						disabled
						variant={fud.done === 1 ? "primary" : "danger"}
					>
						{fud.done === 1 ? "Status bueno " : " Sin proceso "}
					</Button>{" "}
					<br /> <br />
					{/* <span>{fud.createdAt}</span> */}
					<div className="d-grid gap-2">
						<Button
							variant="danger"
							size="lg"
							onClick={() => {
								deleteFud(fud.id);
							}}
						>
							Delete
						</Button>

						<Button
							variant="secondary"
							size="lg"
							onClick={() => navigate(`/edit/${fud.id}`)}
						>
							Edit
						</Button>
						<Button
							variant="info"
							size="lg"
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
