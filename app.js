require('dotenv').config();
require('./config/mongoose-connect');

const cookieParser = require('cookie-parser');
const authRouter = require('./routes/authRouter');
const postRouter = require('./routes/postRouter');
const connectRouter = require('./routes/connectionRouter');
const express = require('express');
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());

app.use('/auth',authRouter);
app.use('/posts',postRouter);
app.use('/connection',connectRouter);

app.listen(3000,()=>{console.log(`server is listening on port 3000...`)});