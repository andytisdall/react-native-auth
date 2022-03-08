// register user model
require('./models/User');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const mongoUri = require('./mongo-key');
const authRouter = require('./routes/auth');

const app = express();
app.use(bodyParser.json());

// connect the auth route to the main app
app.use(authRouter);

// connect to cloud mongo databse
mongoose.connect(mongoUri);
mongoose.connection.on('connected', () => {
  console.log('Connected to mongo cloud');
});
mongoose.connection.on('error', () => {
  console.log('Unable to connect to mongo db');
});

app.listen(4000, () => {
  console.log('Express listening on port 4000');
});
