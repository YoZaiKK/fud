import { pool } from "../db.js";

export const getUsr = async (req, res) => {
	try {
		const [result] = await pool.query(
			"SELECT * FROM tabla_trabajador WHERE rfc = ?",
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
		const { title, description } = req.body;
		const [result] = await pool.query(
			"INSERT INTO tasks(title, description) VALUES(?, ?)",
			[title, description]
		);
		res.json({ id: result.insertId, title, description });
	} catch (error) {
		return res.status(500).json({ message: error.message });
	}
};

export const updateUsr = async (req, res) => {
	try {
		const result = await pool.query("UPDATE tasks SET ? WHERE id = ?", [
			req.body,
			req.params.id,
		]);

		res.json(result);
	} catch (error) {
		return res.status(500).json({ message: error.message });
	}
};

export const deleteUsr = async (req, res) => {
	try {
		const [result] = await pool.query("DELETE FROM tasks WHERE id = ?", [
			req.params.id,
		]);
		if (result.length === 0) {
			return res.status(404).json({ message: "Fud not found" });
		}
		return res.sendStatus(204);
	} catch (error) {
		return res.status(500).json({ message: error.message });
	}
};
