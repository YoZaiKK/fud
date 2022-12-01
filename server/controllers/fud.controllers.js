import { pool } from "../db.js";

export const getFuds = async (req, res) => {
	try {
		const [result] = await pool.query(
			"SELECT * FROM tasks ORDER BY createdAt ASC"
		);
		res.json(result);
	} catch (error) {
		return res.status(500).json({ message: error.message });
	}
};

export const getFud = async (req, res) => {
	try {
		const [result] = await pool.query("SELECT * FROM tasks WHERE id = ?", [
			req.params.id,
		]);
		if (result.length === 0) {
			return res.status(404).json({ message: "Fud not found" });
		}
		return res.json(result[0]);
	} catch (error) {
		return res.status(500).json({ message: error.message });
	}
};

export const createFuds = async (req, res) => {
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

export const updateFuds = async (req, res) => {
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

export const deleteFuds = async (req, res) => {
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
