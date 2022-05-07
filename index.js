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

    

const uri = "mongodb+srv://warehouse1:l9XpzbSczUMLzNAR@warehouseproduct.bux0i.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
client.connect(err => {
  const collection = client.db("test").collection("devices");
  console.log('db connected')
  client.close();
});



app.listen(port, () => {
    console.log('server is running')
})