const express = require("express");
const cors = require("cors");
const port = process.env.PORT || 5000;

const app = express();
require('dotenv').config();

// JSON parser will be used so that when we send the data as JSON it transforms it into a JavaScript Object
app.use(express.json());

app.use(cors());

app.get('/',async(req,res)=>{
    res.send('Social Media running')
});

app.listen(port,()=> console.log(`Social Media is running on ${port}`))