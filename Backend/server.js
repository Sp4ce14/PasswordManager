import express from 'express'
import 'dotenv/config'
import cors from 'cors'
import { MongoClient, ObjectId } from 'mongodb'

// Connection URL
const client = new MongoClient(process.env.MONGO_URL);
let db;
// Database Name
const dbName = 'passManager';
const app = express()
const port = 3000
app.use(cors());
app.use(express.json());


app.get('/records', async (req, res) => {
  const records = await db.collection('Records').find().toArray();
  res.status(200).send(records);
})

app.post('/records', async (req, res) => {
  if (!req.body) {
    res.status(400).send("Bad Request");
  }
  const result = await db.collection('Records').insertOne(req.body); 
  res.status(201).send({...req.body, _id: result.insertedId});
  
})

app.delete("/records/:id", async (req, res) => {
  try {
    const { id } = req.params;

    // 1. validate id format first
    if (!ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid ID format"
      });
    }

    // 2. attempt delete
    const result = await db.collection("Records").deleteOne({
      _id: new ObjectId(id)
    });

    // 3. check if anything was deleted
    if (result.deletedCount === 0) {
      return res.status(404).json({
        success: false,
        message: "Record not found"
      });
    }

    // 4. success response
    return res.status(200).json({
      success: true,
      message: "Record deleted successfully"
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error"
    });
  }
});

app.put("/records/:id", async (req, res) => {
  try {
    const { id } = req.params;

    // 1. validate id format first
    if (!ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid ID format"
      });
    }

    // 2. attempt edit
    const result = await db.collection("Records").updateOne(
      {_id: new ObjectId(id)},
      {$set: req.body}
    );

    // 3. check if anything was deleted
    if (result.matchedCount === 0 || result.modifiedCount === 0) {
      return res.status(404).json({
        success: false,
        message: "Record not found or unknown error"
      });
    }

    // 4. success response
    return res.status(200).json({
      success: true,
      message: "Record updated successfully"
    });

  } catch (error) {
    console.log(error)
    return res.status(500).json({
      success: false,
      message: "Internal server error"
    });
  }
});



app.listen(port, async () => {
  await client.connect();
  db = client.db(dbName);
  console.log(`Example app listening on port ${port}`)
})
