import mysql2 from 'mysql2/promise';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
dotenv.config();

const pool = mysql2.createPool({
	host: process.env.MYSQL_HOST,
	user: process.env.MYSQL_USER,
	password: process.env.MYSQL_PASSWORD,
	database: process.env.MYSQL_DATABASE,
});
const signToken = id => jwt.sign(id, process.env.SECRET);

const Client = {
	register: async (req, res)=>{
		try{
			const { body } = req;
			const [rows, columns] = await pool.execute('SELECT * FROM client WHERE email = ?;', [body.email]);
			if (rows.length < 1){
				const salt = await bcrypt.genSalt();
				const hashed = await bcrypt.hash(body.password, salt);
				const response = await pool.execute('INSERT INTO client (email, name, role, password, salt) VALUES (?, ?, ?, ?, ?)', [body.email, body.name, body.role, hashed, salt]);
				if (response[0].affectedRows == 1) {
					const [rows, columns] = await pool.execute('SELECT * FROM client WHERE email = ?', [body.email]);
					const token = signToken(rows[0].id); 
					res.status(200).send(token);
				} else {
					res.status(400).send('Ha ocurrido un error con los datos ingresados.');
				}
			} else{
				res.status(400).send('Usuario ya existe.')
			}
		} catch (e){
			res.status(500).send(e.message)
		}
	},
	login: async (req, res)=>{
		try {
			const { body } = req;
			const [rows, columns] = await pool.execute('SELECT * FROM client WHERE email = ?', [body.email]);
			res.send(rows);
			if(rows.length > 0){
				
			} else {
				res.status(400).send('Usuario no existe.')
			}
		} catch (e){
			res.status(500).send(e.message);
		}
	}
} 

export default Client;
