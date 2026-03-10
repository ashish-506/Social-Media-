require('dotenv').config();
require('./config/mongoose-connect');

const registrationRoute = require('./routes/register');
const express = require('express');
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use('/register',registrationRoute);
app.listen(3000,()=>{console.log(`server is listening on port 3000...`)});