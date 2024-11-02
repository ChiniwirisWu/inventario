import mysql2 from 'mysql2/promise';
import dotenv from 'dotenv';
dotenv.config();

const pool = mysql2.createPool({
	host: process.env.MYSQL_HOST,
	user: process.env.MYSQL_USER,
	password: process.env.MYSQL_PASSWORD,
	database: process.env.MYSQL_DATABASE,
});

async function getCardById_handler(req, res){
	const { id } = req.params;
	const [rows, columns] = await pool.execute('SELECT * FROM card WHERE id = ?', [id]);
	return rows;
}

const Card = {
	getAllCards: async (req, res)=>{
		try {
			const [rows, columns] = await pool.execute('SELECT * FROM card');
			res.status(200).send(rows);
		} catch(e){
			res.status(500).send(e.message);
		}
	},
	getCardById: async (req, res)=>{
		try{
			const card = await getCardById_handler(req, res);
			if(card.length > 0){
				res.status(200).send(card[0]);
			} else {
				res.status(400).send('No se encontró la ficha.');
			}
		} catch(e){
			res.status(500).send(e.message);
		}
	},
	createCard: async (req, res)=>{
		try {
			const { body } = req;
			const [rows, columns] = await pool.execute('INSERT INTO card (author, title, edition, city, editorial, year, category, volume, collection, isbn, amount, borrowed) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', [body.author, body.title, body.edition, body.city, body.editorial, body.year, body.category, body.volume, body.collection, body.isbn, body.amount, body.borrowed]);
			if(rows.affectedRows > 0){
				res.status(200).send('Ficha creada con éxito.');
			} else{
				res.status(400).send('Hubo un error creando la ficha.');
			}
		} catch (e) {
			res.status(400).send(e.message);
		}
	},
	updateCardById: async (req, res)=>{
		try {
			const { id } = req.params;
			const { body } = req;
			const [rows, columns] = await pool.execute('UPDATE card SET author = ?, title = ?, edition = ?, city = ?, editorial = ?, year = ?, category = ?, volume = ?, collection = ?, isbn = ?, amount = ?, borrowed = ? WHERE id = ?', [body.author, body.title, body.edition, body.city, body.editorial, body.year, body.category, body.volume, body.collection, body.isbn, body.amount, body.borrowed, id]);
			if(rows.affectedRows > 0){
				res.status(200).send('Ficha actualizada con éxito.');
			} else{
				res.status(400).send('Hubo un error creando la ficha.');
			}
		} catch (e) {
			res.status(400).send(e.message);
		}
	}, 
	deleteCardById: async (req, res)=>{
		try {
			const { id } = req.params;
			const response = await getCardById_handler(req, res);
			if(response.length > 0){
				const [rows, columns] = await pool.execute('DELETE FROM card WHERE id = ?', [id]);
				if(rows.affectedRows > 0) {
					res.status(200).send('Eliminado con éxito.');
				} else {
					res.status(400).send('Ocurrió un error Eliminado el registro.');
				}
			}
		} catch (e) {
			res.status(400).send(e.message);
		}
	}
}

export default Card;
