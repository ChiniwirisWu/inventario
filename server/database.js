import mysql2 from 'mysql2/promise';
import dotenv from 'dotenv';
dotenv.config();

const pool = mysql2.createPool({
	host: process.env.MYSQL_HOST,
	user: process.env.MYSQL_USER,
	password: process.env.MYSQL_PASSWORD,
	database: process.env.MYSQL_DATABASE,
});

//cards methods
export async function getAllCards(){
	const [rows, fields] = await pool.execute('SELECT * FROM card');
	return rows;
}

export async function getCardById(id){
	const [rows, fields] = await pool.execute('SELECT * FROM card WHERE id = ?', [id]);
	return rows[0];
}

export async function addCard(data){
	const [rows, fields] = await pool.execute('INSERT INTO card (author, title, edition, city, editorial, year, category, volume, collection, isbn, amount, borrowed) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', [data.author, data.title, data.edition, data.city, data.editorial, data.year, data.category, data.volume, data.collection, data.isbn, data.amount, data.borrowed]);
	return 200;
}

//client methods
export async function getAllClients(){
	const [rows, fields] = await pool.execute('SELECT * FROM cliend');
	return rows;
}

export async function getClientById(id){
	const [rows, fields] = await pool.execute('SELECT * FROM client WHERE id = ?', [id]);
	return rows[0];
}


//borrowed methods
export async function getAllBorrowed(){
	const [rows, fields] = await pool.execute('SELECT * FROM borrowed');
	return rows;
}

export async function getBorrowedById(id){
	const [rows, fields] = await pool.execute('SELECT * FROM borrowed WHERE id = ?', [id]);
	return rows[0];
}
