import mysql2 from 'mysql2/promise';
import dotenv from 'dotenv';
dotenv.config();

const pool = mysql2.createPool({
	host: process.env.MYSQL_HOST,
	user: process.env.MYSQL_USER,
	password: process.env.MYSQL_PASSWORD,
	database: process.env.MYSQL_DATABASE,
});

const Card = {
	getAllCards : async ()=> {
		const [rows, fields] = await pool.execute('SELECT * FROM card');
		return rows;
	},
	getCardById: async (id)=>{
		const [rows, fields] = await pool.execute('SELECT * FROM card WHERE id = ?', [id]);
		return rows[0];
	},
	addCard: async (data)=>{
		const [rows, fields] = await pool.execute('INSERT INTO card (author, title, edition, city, editorial, year, category, volume, collection, isbn, amount, borrowed) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', [data.author, data.title, data.edition, data.city, data.editorial, data.year, data.category, data.volume, data.collection, data.isbn, data.amount, data.borrowed]);
		return 200;
	}
}

export default Card;
