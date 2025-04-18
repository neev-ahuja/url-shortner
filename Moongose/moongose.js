const mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect(process.env.MONGODB_CONNECT_URI, { useNewUrlParser: true, useUnifiedTopology: true }, () => console.log('Connected to MongoDB'));

const schema = new mongoose.Schema({
    url: String,
    id: String,
    clicks: Number
  });
  
const Url = mongoose.model('Url', schema);

module.exports = Url;
