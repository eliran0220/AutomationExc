const http = require('http');
const express = require('express');
const cors = require('cors');
const items_router = require('./routes/item');

const app = express();

app.use(cors())
app.use(express.json());

app.use("/items",items_router);

app.use('/',
    async (req,res) =>{
        res.status(200).send("Welcome");
    });
const server = http.createServer(app);
const port = 3000;
server.listen(port);
