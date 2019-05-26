const express = require('express');

const app = express();

// IMPORT ROUTES
const authRoute = require('./routes/auth');

// ROUTE MIDDLEWARE
app.use('/api/user', authRoute);

app.listen(3000, () => {
  console.log("Running");
})