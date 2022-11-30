import { Route, Routes } from "react-router-dom";
import React from "react";
import { TaskPage } from "./pages/TaskPage.jsx";
import { TaskForm } from "./pages/TaskForm.jsx";
import { NotFound } from "./pages/NotFound.jsx";
import { Navbar } from "./components/Navbar.jsx";
import { TaskContextProvider  } from "./context/TaskContext.jsx";

function App() {
	return (
		<TaskContextProvider>
			<Navbar />
			<Routes>
				<Route path="/" element={<TaskPage />} />
				<Route path="/new" element={<TaskForm />} />
				<Route path="/edit/:id" element={<TaskForm />} />
				<Route path="*" element={<NotFound />} />
			</Routes>
		</TaskContextProvider>
	);
}

export default App;
