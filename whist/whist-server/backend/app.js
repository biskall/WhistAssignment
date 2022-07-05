const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const cors = require("cors");
const Admin = require('./models/admin_model')


const mongoose = require('mongoose');
const DATABASE_URL = 'mongodb+srv://itaibiskall:it02le93@cluster.02osm.mongodb.net/?retryWrites=true&w=majority';
mongoose.connect(DATABASE_URL,{useNewUrlParser:true})
const db  = mongoose.connection;
db.on('error', err => {
    console.log(err)
});
db.once('open',()=> console.log('Connected to mongoose successfully!'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors({ origin: true }));

app.use((req, res, next) => {
  // Connecting node to angular
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
   'Origin, X-Requested-With, Content-Type, Accept');
  res.setHeader('Access-Control-Allow-Methods',
   'GET, POST, PATCH, PUT, DELETE, OPTIONS'
   );
  next();
})


const adminRouter = require('./route/admin_route');
app.use('/admin', adminRouter)

const statsRouter = require('./route/stats_route');
app.use('/stats', statsRouter)


module.exports = app;

