import mysql2 from 'mysql2/promise';
import dotenv from 'dotenv';
dotenv.config();

const pool = mysql2.createPool({
	host: process.env.MYSQL_HOST,
	user: process.env.MYSQL_USER,
	password: process.env.MYSQL_PASSWORD,
	database: process.env.MYSQL_DATABASE,
});

const Client = {
	getAllClients: async (req, res)=>{
		const [rows, fields] = await pool.execute('SELECT * FROM client');
		res.status(200).send(rows);
	},
	getClientByEmail: async (email)=>{
		try{
			const [rows, fields] = await pool.execute('SELECT * FROM client WHERE email = ?', [email]);
			return rows;
		} catch (err){
			return null; 
		}
	},
	createClient: async (body, encrypted_password, salt)=> {
		const { name, role, email } = body;
		const [rows, fields] = await pool.query('INSERT INTO client (email, name, password, salt, role) VALUES (?, ?, ?, ?, ?)', [email, name, encrypted_password, salt, role]);
		return rows.affectedRows;
	}
} 

export default Client;
