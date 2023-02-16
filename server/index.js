const express = require('express');
const morgan = require("morgan");
const dotenv =require('dotenv').config();
const db = require('./routes/db-config');
const cookie = require ('cookie-parser');
const app = express();
const PORT= 4000 || process.env.PORT
const cors = require('cors');

db.connect(e => {if(e) throw e})
app.use(morgan("dev"));
app.use(cookie());
app.use(express.json());
app.use(cors({
    origin: "http://127.0.0.1:5173",
    credentials:true,     
  }));


app.use('/api',require('./controllers/app'));
app.listen(PORT);
