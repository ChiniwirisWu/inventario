import mysql2 from 'mysql2/promise';
import dotenv from 'dotenv';
dotenv.config();

const pool = mysql2.createPool({
	host: process.env.MYSQL_HOST,
	user: process.env.MYSQL_USER,
	password: process.env.MYSQL_PASSWORD,
	database: process.env.MYSQL_DATABASE,
});

async function getBorrowedById_handler(req, res){
	const { id } = req.params;
	const [rows, columns] = await pool.execute('SELECT * FROM borrowed WHERE id = ?', [id]);
	return rows;
}

const Borrowed = {
	getAllBorrowed: async (req, res)=>{
		try {
			const [rows, columns] = await pool.execute('SELECT * FROM borrowed');
			res.status(200).send(rows);
		} catch(e){
			res.status(500).send(e.message);
		}
	},
	getBorrowedById: async (req, res)=>{
		try{
			const borrowed = await getBorrowedById_handler(req, res);
			if(borrowed.length > 0){
				res.status(200).send(borrowed[0]);
			} else {
				res.status(400).send('No se encontró el préstamo.');
			}
		} catch(e){
			res.status(500).send(e.message);
		}
	},
	createBorrowed: async (req, res)=>{
		try {
			const { body } = req;
			const [rows, columns] = await pool.execute('INSERT INTO borrowed (id_card, email_client) VALUES (?, ?)', [body.id_card, body.email_client]);
			if(rows.affectedRows > 0){
				res.status(200).send('Préstamo creado con éxito.');
			} else{
				res.status(400).send('Hubo un error creando el préstamo.');
			}
		} catch (e) {
			res.status(400).send(e.message);
		}
	},
	updateBorrowedById: async (req, res)=>{
		try {
			const { id } = req.params;
			const { body } = req;
			const [rows, columns] = await pool.execute('UPDATE borrowed SET id_card = ?, email_client = ?', [body.id_card, body.email_client]);
			if(rows.affectedRows > 0){
				res.status(200).send('Préstamo actualizado con éxito.');
			} else{
				res.status(400).send('Hubo un error creando el préstamo.');
			}
		} catch (e) {
			res.status(400).send(e.message);
		}
	}, 
	deleteBorrowedById: async (req, res)=>{
		try {
			const { id } = req.params;
			const response = await getBorrowedById_handler(req, res);
			if(response.length > 0){
				const [rows, columns] = await pool.execute('DELETE FROM borrowed WHERE id = ?', [id]);
				if(rows.affectedRows > 0) {
					res.status(200).send('Eliminado con exito.');
				} else {
					res.status(400).send('Ocurrio un error Eliminado el préstamo.');
				}
			}
		} catch (e) {
			res.status(400).send(e.message);
		}
	}
}
export default Borrowed;
