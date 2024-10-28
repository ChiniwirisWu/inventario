import express from 'express';
import bcrypt from 'bcrypt';
import cors from 'cors';
import { 
	getAllCards,
	getCardById,
	addCard,
	getAllClients,
	getAllBorrowed,
	getBorrowedById,
	createClient,
	getClientById
} from './database.js';

//middlewares 
const app = express();
app.use(express.json());
app.use(cors()); 

// estas son mis endpoints
app.get('/getAllCards/', async (req,res)=>{
	const rows = await getAllCards(); 
	res.status(200).send(rows);
})

app.get('/getCardById/:id', async (req,res)=>{
	const row = await getCardById(req.params.id);
	res.status(200).send(row);
})

app.get('/getAllBorrowed/', async (req,res)=>{
	const rows = await getAllBorrowed(); 
	res.status(200).send(rows);
})

app.get('/getBorrowedById/', async (req,res)=>{
	const row = await getBorrowedById(req.params.id); 
	res.status(200).send(row);
})

app.get('/getAllClients/', async (req,res)=>{
	const rows = await getAllClients(); 
	res.status(200).send(rows);
})

app.get('/getClientById/', async (req,res)=>{
	const row = await getClientById(req.params.id); 
	res.status(200).send(row);
})


// post, put, and delete
app.post('/addCard/', async (req, res)=>{
	const status = await addCard(req.body);
	res.sendStatus(status)
})

app.post('/addUser', async (req, res)=>{
	const { body } = req;
	const salt = await bcrypt.genSalt();
	const encrypted_password = await bcrypt.hash(body.password, salt);
	const savedId = createClient(body, encrypted_password, salt);
	res.status(200).send(savedId)
})


app.listen(9090, ()=>{
	console.log('server running on port 9090');
})
