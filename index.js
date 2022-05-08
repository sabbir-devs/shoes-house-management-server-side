const express = require('express');
const app = express();
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
const port = process.env.PORT || 5000


// user name: warehouse1;
// password : l9XpzbSczUMLzNAR;

// for meddleware
app.use(cors());
app.use(express.json())

app.get('/', (req, res) => {
    res.send('Hello from server')
})

    

const uri = `mongodb+srv://warehouse1:l9XpzbSczUMLzNAR@warehouseproduct.bux0i.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
async function run() {
  try{
    await client.connect();
    const shoesCollection = client.db("warehouseProduct").collection("shoes");
    app.get('/shoes', async(req, res) => {
        const quary = {};
        const cursor = shoesCollection.find(quary)
        const result = await cursor.toArray()
        res.json(result)
    })
  }
  finally{
    // await client.close();
  }
}
run().catch(console.dir)
// client.connect(err => {
//   const collection = client.db("warehouseProduct").collection("shoes");
//   console.log('db connected')
//   client.close();
// });



app.listen(port, () => {
    console.log('server is running')
})