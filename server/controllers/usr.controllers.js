import { pool } from "../db.js";

export const getUsr = async (req, res) => {
	try {
		const [result] = await pool.query(
			"SELECT nombre, primer_apellido, contrasena  FROM tabla_trabajador WHERE rfc = ?",
			[req.params.rfc]
		);
		if (result.length === 0) {
			return res.status(404).json({ message: "No se mira el rfc" });
		}
		return res.json(result[0]);
	} catch (error) {
		return res.status(500).json({ message: error.message });
	}
};

export const createUsr = async (req, res) => {
	try {
		const {
			rfc,
			nombre,
			primer_apellido,
			segundo_apellido,
			contrasena,
			ocupa,
		} = req.body;

		const [result] = await pool.query(
			"INSERT INTO tabla_trabajador(rfc, nombre, primer_apellido, segundo_apellido, contrasena, ocupa) VALUES(? , ? , ? , ? , ? , ?);",
			[rfc, nombre, primer_apellido, segundo_apellido, contrasena, ocupa]
		);

		res.json({
			id: result.insertId,
			rfc,
			nombre,
			primer_apellido,
			segundo_apellido,
			contrasena,
			ocupa,
		});
	} catch (error) {
		return res.status(500).json({ message: error.message });
	}
};

export const updateUsr = async (req, res) => {
	try {
		const result = await pool.query("UPDATE tabla_trabajador SET ? WHERE rfc = ?", [
			req.body,
			req.params.rfc,
		]);

		res.json(result);
	} catch (error) {
		return res.status(500).json({ message: error.message });
	}
};

export const deleteUsr = async (req, res) => {
	try {
		const [result] = await pool.query("DELETE FROM tabla_trabajador WHERE rfc = ?", [
			req.params.rfc,
		]);
		if (result.length === 0) {
			return res.status(404).json({ message: "Worker not found" });
		}
		return res.sendStatus(204);
	} catch (error) {
		return res.status(500).json({ message: error.message });
	}
};
