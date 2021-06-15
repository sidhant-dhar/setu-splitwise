const app = require('express').Router();
const jwt = require('jsonwebtoken');
const userOperation = require('../database/utitlies');
// app.post('/login', (req, res) => {
//   // console.log("header is ",req.header);
//   console.log(req.body);
//   userOperation.login(req.body, res);
// });

app.post('/adduser', (req, res) => {
  console.log(req.body);
  userOperation.AddUser(req.body, res);
});

app.get('/getData', async (req, res) => {
  var result = await userOperation.Find(req.query.username);

  if (result) {
    res.json({ user: result });
  } else {
    console.log('not possible');
  }
});

app.post('/addExp', (req, res) => {
  userOperation.AddExp(req.body, res);
});
app.post('/settle', (req, res) => {
  userOperation.settle(req.body, res);
});

app.get('/allUsers', (req, res) => {
  userOperation.getAllUsers(req, res);
});

// app.delete('/removeuser/:username', (req, res) => {
//   userOperation.removeUser(req, res);
// });

module.exports = app;
