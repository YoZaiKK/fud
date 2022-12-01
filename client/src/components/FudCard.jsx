import { useFuds } from "../context/FudContext";
import { useNavigate } from "react-router-dom";
function FudCard({ fud }) {
	const { deleteFud, toggleFudDone } = useFuds();
	const navigate = useNavigate();
	const handleDone = async (fudDone) => {
		await toggleFudDone(fud.id);
	};
	return (
		<div>
			<h2>{fud.title}</h2>
			<p>{fud.description}</p>
			<span>{fud.done === 1 ? "Hecha " : "No hecha:c "}</span>
			<span>{fud.createdAt}</span>
			<button
				onClick={() => {
					deleteFud(fud.id);
				}}
			>
				Delete
			</button>

			<button onClick={() => navigate(`/edit/${fud.id}`)}>Edit</button>
			<button onClick={() => handleDone(fud.done)}>Toggle fud</button>
		</div>
	);
}

export default FudCard;
