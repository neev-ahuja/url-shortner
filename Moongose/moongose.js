const mongoose = require('mongoose');

// mongoose.connect('mongodb://localhost:27017/url', { useNewUrlParser: true, useUnifiedTopology: true }, () => console.log('Connected to MongoDB'));


mongoose.connect('mongodb+srv://neevahuja:y0BLFOsnZCErff86@cluster-1.ejpikke.mongodb.net/?retryWrites=true&w=majority&appName=Cluster-1', { useNewUrlParser: true, useUnifiedTopology: true }, () => console.log('Connected to MongoDB'));


const schema = new mongoose.Schema({
    url: String,
    id: String,
    clicks: Number
  });
  
const Url = mongoose.model('Url', schema);

module.exports = Url;  
