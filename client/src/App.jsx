import { Route, Routes } from "react-router-dom";
import React from "react";
import { TaskPage } from "./pages/TaskPage.jsx";
import { TaskForm } from "./pages/TaskForm.jsx";
import { NotFound } from "./pages/NotFound.jsx";
import { Navbar } from "./components/Navbar.jsx";

function App() {
	return (
		<>
			<Navbar />
			<Routes>
				<Route path="/" element={<TaskPage />} />
				<Route path="/new" element={<TaskForm />} />
				<Route path="*" element={<NotFound />} />
			</Routes>
		</>
	);
}

export default App;
