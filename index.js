const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { MongoClient, ServerApiVersion } = require('mongodb');
const ObjectId = require('mongodb').ObjectId;

const app = express();
const port = process.env.PORT || 5000;


// check new branch
// for meddleware
app.use(cors());
app.use(express.json())

app.get('/', (req, res) => {
    res.send('Hello from server')
})


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@warehouseproduct.bux0i.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
async function run() {
  try{
    await client.connect();
    const shoesCollection = client.db("warehouseProduct").collection("shoes");
    // show product 
    console.log('data base is connectedS')
    app.get('/shoes', async(req, res) => {
        const query = {};
        const cursor = shoesCollection.find(query)
        const result = await cursor.toArray()
        res.json(result)
    })
    // my product 
    app.get('/product', async(req, res) => {
      const email = req.query.email;
      console.log(email)
      const query = { email: email };
      const cursor = shoesCollection.find(query);
      const result = await cursor.toArray();
      res.json(result)
    })
    // single product
    app.get('/shoes/:id', async(req, res) => {
      const id = req.params.id;
      const quary = {_id: ObjectId(id)};
      const result = await shoesCollection.findOne(quary);
      res.json(result)
    })
    // add a new product
    app.post('/shoes', async(req, res) => {
      const product = req.body;
      const result = await shoesCollection.insertOne(product);
      res.json(result);
    })
    // update user
    app.put('/shoes/:id', async(req, res) => {
      const quantity = req.body.totalQuantity;
      const sold = req.body.totalSold;
      const id = req.body.id;
      const query = {_id: ObjectId(id)}
      const options = { upsert: true};
      const updateDoc = {
        $set: {quantity: quantity, solld: sold},
      }
      const result = await shoesCollection.updateOne(query, updateDoc, options);
      res.json(result)
    })
    // delete a product
    app.delete('/shoes/:id', async(req, res) => {
      const id = req.params.id;
      const query = {_id: ObjectId(id)};
      const result = await shoesCollection.deleteOne(query)
      res.json(result)
    })
  }
  finally{
    // await client.close();
  }
}
run().catch(console.dir);

app.listen(port, () => {
    console.log('server is running')
})