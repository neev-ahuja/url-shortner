const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/url', { useNewUrlParser: true, useUnifiedTopology: true }, () => console.log('Connected to MongoDB'));


const schema = new mongoose.Schema({
    url: String,
    id: String,
    clicks: Number
  });
  
const Url = mongoose.model('Url', schema);

module.exports = Url;  