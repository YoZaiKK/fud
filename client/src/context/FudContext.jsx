import { createContext, useContext, useState } from "react";
import {
	getFudsRequest,
	deleteFudRequest,
	createFudRequest,
	getFudRequest,
	updateFudRequest,
	toggleFudDoneRequest,
} from "../api/fud.api";
import {
	getUsrRequest,
	deleteUsrRequest,
	createUsrRequest,
	updateUsrRequest,
} from "../api/usr.api";

export const FudContext = createContext();

export const useFuds = () => {
	const context = useContext(FudContext);
	if (!context) {
		throw new Error("useFuds must be used within a FudContextProvider");
	}
	return context;
};

export const FudContextProvider = ({ children }) => {
	//cargar arreglo de registros
	const [fud, setFud] = useState([]);
	async function loadFud() {
		const { data } = await getFudsRequest();
		setFud(data);
	}
	// create reg
	const createFud = async (fud) => {
		try {
			await createFudRequest(fud);
		} catch (error) {
			console.error(error);
		}
	};
	// delete reg
	const deleteFud = async (id) => {
		try {
			await deleteFudRequest(id);
			setFud(fud.filter((fud) => fud.id !== id));
		} catch (e) {
			console.error(e);
		}
	};
	// get single reg by id
	const getFud = async (id) => {
		try {
			const response = await getFudRequest(id);
			// setFud(fud.filter((fud) => fud.id !== id));
			return response.data;
		} catch (e) {
			console.error(e);
		}
	};

	const updateFud = async (id, newFields) => {
		try {
			const response = await updateFudRequest(id, newFields);
			console.log(response);
		} catch (e) {
			console.error(e);
		}
	};

	const toggleFudDone = async (id) => {
		try {
			const fudFound = fud.find((fud) => fud.id === id);
			await toggleFudDoneRequest(id, fudFound.done === 0 ? 1 : 0);
			setFud(
				fud.map((fud) =>
					fud.id === id ? { ...fud, done: fud.done ? 0 : 1 } : fud
				)
			);
		} catch (e) {
			console.error(e);
		}
	};
	// get single reg by id
	const getUsr = async ({ rfc, contrasena }) => {
		try {
			const { data } = await getUsrRequest(rfc);
			// setFud(fud.filter((fud) => fud.id !== id));
			console.log(data);
			// console.log("de la bd: ", data.contrasena);
			// console.log("del formulario: ", contrasena);
			return data.contrasena == contrasena;
		} catch (e) {
			console.error(e);
		}
	};

	const createUsr = async (campos) => {
		try {
			const response = await createUsrRequest(campos);
			// setFud(fud.filter((fud) => fud.id !== id));
			console.log(response.data)
			return response.data;
		} catch (e) {
			console.error(e);
		}
	};
	return (
		<FudContext.Provider
			value={{
				fud,
				getUsr,
				createUsr,
				loadFud,
				deleteFud,
				createFud,
				getFud,
				updateFud,
				toggleFudDone,
			}}
		>
			{children}
		</FudContext.Provider>
	);
};
