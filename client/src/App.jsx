import { Route, Routes } from "react-router-dom";
import React from "react";
import { FudPage } from "./pages/FudPage.jsx";
import { HomePage } from "./pages/HomePage.jsx";
import { FudForm } from "./pages/FudForm.jsx";
import { NotFound } from "./pages/NotFound.jsx";
import { ANNA } from "./pages/ANNA.jsx";
import { NavbarComponent } from "./components/NavbarComponent.jsx";
import { FudContextProvider } from "./context/FudContext.jsx";
import { Seguimiento } from "./pages/Seguimiento.jsx";
import { IntSuperior } from "./pages/IntSuperior.jsx";
import { LoginPage } from "./pages/LoginPage.jsx";
import { RegisterPage } from "./pages/RegisterPage.jsx";
import { AcercamientoFam } from "./pages/AcercamientoFam.jsx";

function App() {
	return (
		<FudContextProvider>
			<NavbarComponent />
			<Routes>
				<Route path="/" element={<HomePage />} />
				<Route path="/resultados" element={<FudPage />} />
				<Route path="/new" element={<FudForm />} />
				<Route path="/login" element={<LoginPage />} />
				<Route path="/register" element={<RegisterPage />} />
				<Route path="/Seguimiento" element={<Seguimiento />} />
				<Route path="/Formulario" element={<ANNA />} />
				<Route path="/IntSuperior" element={<IntSuperior />} />
				<Route path="/AcercamientoFam" element={<AcercamientoFam />} />
				<Route path="/edit/:id" element={<FudForm />} />
				<Route path="*" element={<NotFound />} />
			</Routes>
		</FudContextProvider>
	);
}

export default App;
