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

async function getClientById_handler(req, res){
	const { id } = req.params;
	const [rows, columns] = await pool.execute('SELECT * FROM client WHERE id = ?', [id]);
	return rows;
}

const Client = {
	//Funciones para endpoints...
	register: async (req, res)=>{
		try{
			const { body } = req;
			const [rows, columns] = await pool.execute('SELECT * FROM client WHERE email = ?', [body.email]);
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
			if(rows.length > 0){
				const isMatch = await bcrypt.compare(body.password, rows[0].password);	
				if(isMatch){
					const token = signToken(rows[0].id);
					res.status(200).send(token);
				} else{
					res.status(400).send('Contraseña incorrecta.')
				}
			} else {
				res.status(400).send('Usuario no existe.')
			}
		} catch (e){
			res.status(500).send(e.message);
		}
	},
	getAllClients: async (req, res)=>{
		try {
			const [rows, columns] = await pool.execute('SELECT * FROM client');
			res.status(200).send(rows);
		} catch(e){
			res.status(500).send(e.message);
		}
	},
	getClientById: async (req, res)=>{
		try{
			const clients = await getClientById_handler(req, res);
			if(clients.length > 0){
				res.status(200).send(clients[0]);
			} else {
				res.status(400).send('No se encontró el cliente.');
			}
		} catch(e){
			res.status(500).send(e.message);
		}
	},
	updateClientById: async (req, res)=>{
		try {
			const { id } = req.params;
			const { body } = req;
			const clients = await getClientById_handler(req, res);
			if (clients.length > 0){
				const salt = await bcrypt.genSalt();
				const hash = await bcrypt.hash(body.password, salt);
				const [rows, columns] = await pool.execute('UPDATE client SET name = ?, password = ?, email = ?, salt = ? WHERE id = ?', [body.name, hash, body.email, salt, id]);
				if(rows.affectedRows > 0){
					res.status(200).send('Cliente actualizado con éxito.');
				} else{
					res.status(400).send('Hubo un error actualizando el cliente.');
				}
			} else {
				res.status(400).send('El cliente ingresado no existe.')
			}
		} catch (e) {
			res.status(400).send(e.message);
		}
	}, 
	deleteClientById: async (req, res)=>{
		try {
			const { id } = req.params;
			const clients = await getClientById_handler(req, res);
			if(clients.length > 0){
				const [rows, columns] = await pool.execute('DELETE FROM client WHERE id = ?', [id]);
				if(rows.affectedRows > 0) {
					res.status(200).send('Eliminado con exito.');
				} else {
					res.status(400).send('Ocurrió un error Eliminado el cliente.');
				}
			}
		} catch (e) {
			res.status(400).send(e.message);
		}
	},
	//Funciones normales.... 
	getClient: async (id)=>{
		const [rows, columns] = await pool.execute('SELECT * FROM client WHERE id = ?', [id]);
		if(rows.length > 0){
			return rows[0];
		} else {
			return [];
		}
	},
} 

export default Client;
