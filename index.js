const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
const ObjectId = require('mongodb').ObjectId;

const app = express();
const port = process.env.PORT || 5000;


// user name: warehouse1;
// password : l9XpzbSczUMLzNAR;

// for meddleware
app.use(cors());
app.use(express.json())

app.get('/', (req, res) => {
    res.send('Hello from server')
})

// stackoverflow anwser: https://stackoverflow.com/questions/72157598/is-their-storage-limit-in-github-repository-storage/72157616#72157616s
    

const uri = `mongodb+srv://warehouse1:l9XpzbSczUMLzNAR@warehouseproduct.bux0i.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
async function run() {
  try{
    await client.connect();
    const shoesCollection = client.db("warehouseProduct").collection("shoes");
    // show product 
    app.get('/shoes', async(req, res) => {
        const query = {};
        const cursor = shoesCollection.find(query)
        const result = await cursor.toArray()
        res.json(result)
    })
    // single product
    app.get('/shoes/:id', async(req, res) => {
      const id = req.params.id;
      const quary = {_id: ObjectId(id)};
      const result = await shoesCollection.findOne(quary);
      res.json(result)
    })
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