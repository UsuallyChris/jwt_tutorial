const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');


const app = express();
dotenv.config();

// CONNECT TO DB
mongoose.connect(
  process.env.DB_CONNECT,
  { useNewUrlParser: true },
  () => {console.log("Connected to db.")}
);

// MIDDLEWARE
app.use(express.json());

// IMPORT ROUTES
const authRoute = require('./routes/auth');

// ROUTE MIDDLEWARE
app.use('/api/user', authRoute);

app.listen(3000, () => {
  console.log("Running");
})