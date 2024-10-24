import express from 'express';
import cors from 'cors';
import { 
	getAllCards,
	getCardById,
	addCard,
	getAllClients,
	getAllBorrowed,
	getBorrowedById
} from './database.js';

//Esto es una medida de seguridad. TODO: Entender cómo usar corsOptions para el middleware cors();  
//const corsOptions = {
	//origin: "http://127.0.0.1:9090",
	//methods: ['POST','GET'],
	//credentials: true
//}

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


// post, put, and delete
app.post('/addCard/', async (req, res)=>{
	const status = await addCard(req.body);
	res.sendStatus(status)
})


app.listen(9090, ()=>{
	console.log('server running on port 9090');
})
