const mongoose = require('mongoose');
mongoose.connect(
  'mongodb+srv://sid:sid123456789@cluster0.knefn.mongodb.net/splitwise?retryWrites=true&w=majority',
  { useUnifiedTopology: true, useNewUrlParser: true }
);

mongoose.connection.on('open', () => {
  console.log('connected to database');
});

module.exports = mongoose;
