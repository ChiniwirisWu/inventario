import express from 'express';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import cors from 'cors';
import jwt from 'jsonwebtoken';
import { expressjwt } from 'express-jwt';
import Borrowed from './borrowed.controller.js';
import Client from './client.controller.js';
import Card from './card.controller.js';
dotenv.config();

//middlewares 
const app = express();
app.use(express.json());
app.use(cors()); 

//funciones
const signJwt = id => jwt.sign(id, process.env.SECRET)
const validateJwt = expressjwt({ secret: process.env.SECRET, algorithms: ['HS256'] })
const assignClient = async (req, res, next)=>{
	try{
		const client = await getClientByEmail(req.auth);
		req.client = client;
		next();
	} catch(e){
		next(e);
	}
}
const isAuthorized = express.Router().use(validateJwt, assignClient)

app.post('/register', Client.register);
app.post('/login', Client.login);
// estas son mis endpoints
//app.get('/getAllCards/', async (req,res)=>{
	//const rows = await Card.getAllCards(); 
	//res.status(200).send(rows);
//})

//app.get('/getCardById/:id', async (req,res)=>{
	//const row = await getCardById(req.params.id);
	//res.status(200).send(row);
//})

//app.get('/getAllBorrowed/', async (req,res)=>{
	//const rows = await getAllBorrowed(); 
	//res.status(200).send(rows);
//})

//app.get('/getBorrowedById/', async (req,res)=>{
	//const row = await getBorrowedById(req.params.id); 
	//res.status(200).send(row);
//})

//app.get('/getAllClients/', async (req,res)=>{
	//const rows = await getAllClients(); 
	//res.status(200).send(rows);
//})

//app.get('/getClientByEmail/:email', async (req,res)=>{
	//const row = await getClientByEmail(req.params.email); 
	//res.status(200).send(row);
//})


//// post, put, and delete
//app.post('/addCard/', async (req, res)=>{
	//const status = await addCard(req.body);
	//res.sendStatus(status)
//})

//app.post('/register', async (req, res)=>{
	//try{
		//const { body } = req;
		//const client = await getClientByEmail(body.email)
		////caso donde el usuario no existe
		//console.log(client)
		//if(client.length < 1){
			//const salt = await bcrypt.genSalt();
			//const hashed = await bcrypt.hash(body.password, salt);
			//const affectedRows = createClient(body, hashed, salt);
			//const client = await getClientByEmail(body.email);
			//const token = signJwt(client[0].email); // this is the jwt
			//res.status(200).send(token);
		//} else{
			//res.status(401).send('Usuario ya existe')
		//}
	//} catch (err){
		//res.status(500).send(err.message)
	//}
//})

//app.post('/login', async (req, res)=>{
	//const { body } = req
	//try {
		//const user = await getClientByEmail(body.email)
		//if(user.length > 0){
			//const isMatch = await bcrypt.compare(body.password, user[0].password)
			//if(isMatch){
				//const token = signJwt(user[0].email)
				//res.status(200).send(token)
			//}
			//res.status(401).send('Usuario y/o contraseña inválida')
		//} else{
			//res.status(401).send('Usuario no existe')
		//}
	//} catch (err){
		//res.status(500).send(err.message)
	//}
//})



//app.get('/lala', isAuthorized, (req, res, next)=>{
	//res.status(401).send(req.client);
//})

app.listen(9090, ()=>{
	console.log('server running on port 9090');
})

