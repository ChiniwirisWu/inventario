import mysql2 from 'mysql2/promise';
import dotenv from 'dotenv';
dotenv.config();

const pool = mysql2.createPool({
	host: process.env.MYSQL_HOST,
	user: process.env.MYSQL_USER,
	password: process.env.MYSQL_PASSWORD,
	database: process.env.MYSQL_DATABASE,
});

const Borrowed = {
	getAllBorrowed: async ()=>{
		const [rows, fields] = await pool.execute('SELECT * FROM borrowed');
		return rows;
	},
	getBorrowedById: async (id)=> {
		const [rows, fields] = await pool.execute('SELECT * FROM borrowed WHERE id = ?', [id]);
		return rows[0];
	}
}

export default Borrowed;
