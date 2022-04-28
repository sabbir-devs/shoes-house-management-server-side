const express = require('express');
const app = express();
const cors = require('cors');
const port = process.env.PORT || 5000


// for meddleware
app.use(cors());
app.use(express.json())

app.get('/', (req, res) => {
    res.send('Hello from server')
})


app.listen(port, () => {
    console.log('server is running')
})