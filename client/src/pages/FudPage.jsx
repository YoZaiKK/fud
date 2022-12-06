import { useEffect, useState } from "react";
import FudCard from "../components/FudCard";
import { useFuds } from "../context/FudContext";

export const FudPage = function () {
	const { fud, loadFud } = useFuds();
	console.log(fud);

	useEffect(() => { 
		loadFud(); 
	}, []);

	function renderMain() {
		if (fud.length === 0) return <h2>No fuds yet</h2>;
		return fud.map((fud) => <FudCard fud={fud} key={fud.id} />);
	}

	return (
		<div>
			<h1>Fuds</h1>
			{renderMain()}
		</div>
	);
};
