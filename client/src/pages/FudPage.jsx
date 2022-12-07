import { useEffect, useState } from "react";
import FudCard from "../components/FudCard";
import { useFuds } from "../context/FudContext";
import Container from "react-bootstrap/Container";

export const FudPage = function () {
	const { fud, loadFud } = useFuds();
	console.log(fud);

	useEffect(() => {
		loadFud();
	}, []);

	function renderMain() {
		if (fud.length === 0) return <h2>No fuds yet</h2>;
		return fud.map((fud) => (
			<div>
				<FudCard fud={fud} key={fud.id} />
			</div>
		));
	}

	return (
		<div>
			<Container>
				<h1>Fuds</h1>
				<div
					className="text-center box"
					style={{
						display: "flex",
						flexwrap: "wrap",
					}}
				>
					{renderMain()}
				</div>
			</Container>
		</div>
	);
};
