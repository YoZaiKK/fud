import { Route, Routes } from "react-router-dom";
import React from "react";
import { FudPage } from "./pages/FudPage.jsx";
import { FudForm } from "./pages/FudForm.jsx";
import { NotFound } from "./pages/NotFound.jsx";
import { NavbarComponent } from "./components/NavbarComponent.jsx";
import { FudContextProvider  } from "./context/FudContext.jsx";


function App() {
	return (
		<FudContextProvider>
			<NavbarComponent />
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
