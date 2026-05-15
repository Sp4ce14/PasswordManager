import express from 'express'
import 'dotenv/config'
import cors from 'cors'
import { MongoClient } from 'mongodb'

// Connection URL
const client = new MongoClient(process.env.MONGO_URL);
let db;
// Database Name
const dbName = 'passManager';
const app = express()
const port = 3000
app.use(cors());
app.use(express.json());


app.get('/', async (req, res) => {
  const records = await db.collection('Records').find().toArray();
  res.status(200).send(records);
})

app.post('/', async (req, res) => {
  if (!req.body) {
    res.status(400).send("Bad Request");
  }
  const result = await db.collection('Records').insertOne(req.body); 
  res.status(201).send({...req.body, _id: result.insertedId});
})


app.listen(port, async () => {
  await client.connect();
  db = client.db(dbName);
  console.log(`Example app listening on port ${port}`)
})
