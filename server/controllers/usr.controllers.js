import { pool } from "../db.js";

export const getUsr = async (req, res) => {
	try {
		const [result] = await pool.query("SELECT * FROM tasks WHERE rfc = ?", [
			req.params.rfc,
		]);
		if (result.length === 0) { 
			return res.status(404).json({ message: "No se mira el rfc" });
		}
		return res.json(result[0]);
	} catch (error) {
        console.log('entrando al error pa');
		return res.status(500).json({ message: error.message });
	}
};