const dotenv = require('dotenv');
const express = require('express');
const path = require('path');
const app = express();
const port = 8000;
const userRoute = require('./APIs/routes');
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// app.use(require('./utils/cors'));

app.use('/', userRoute);
app.listen(process.env.PORT || 1234, (err) => {
  if (err) {
    console.log('Error in sever Staring ', err);
  } else {
    console.log('Server started .....');
  }
});
