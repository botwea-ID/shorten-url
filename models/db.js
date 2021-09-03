const mongoose = require('mongoose');
const MONGO_URI = 'mongodb+srv://Franky404:frangki12345@cluster0.u6x4y.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
const connect = () => {
  mongoose.connect(MONGO_URI, {useNewUrlParser : true, useUnifiedTopology : true})
  .then(() => console.log('DB connected'))
  .catch(err => console.log(err));
  mongoose.connection.on('error', err => {
    console.log(`DB connection error : ${err.message}`);
  });
}

module.exports = { connect }; 
