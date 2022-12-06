import { Route, Routes } from "react-router-dom";
import React from "react";
import { FudPage } from "./pages/FudPage.jsx";
import { FudForm } from "./pages/FudForm.jsx";
import { NotFound } from "./pages/NotFound.jsx";
import { Navbar } from "./components/Navbar.jsx";
import { FudContextProvider  } from "./context/FudContext.jsx";

function App() {
	return (
		<FudContextProvider>
			<Navbar />
			<Routes>
				<Route path="/" element={<FudPage />} />
				<Route path="/new" element={<FudForm />} />
				<Route path="/edit/:id" element={<FudForm />} />
				<Route path="*" element={<NotFound />} />
			</Routes>
		</FudContextProvider>
	);
}

export default App;
