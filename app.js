require('dotenv').config();
require('./config/mongoose-connect');

const cookieParser = require('cookie-parser');
const authRouter = require('./routes/authRouter');
const postRouter = require('./routes/postRouter');
const connectRouter = require('./routes/connectionRouter');
const express = require('express');
const app = express();

const swaggerUi = require("swagger-ui-express");
const YAML = require("yamljs");

const swaggerDocument = YAML.load("./swagger.yaml");

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));


app.use('/auth',authRouter);
app.use('/posts',postRouter);
app.use('/connection',connectRouter);

app.listen(3000,()=>{console.log(`server is listening on port 3000...`)});