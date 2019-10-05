const express = require('express');
const routes = require('./routes');
const mongoose = require('mongoose');

const app = express();

mongoose.connect('mongodb://neto:466850@oministack-shard-00-00-wyak1.mongodb.net:27017,oministack-shard-00-01-wyak1.mongodb.net:27017,oministack-shard-00-02-wyak1.mongodb.net:27017/semana09?ssl=true&replicaSet=Oministack-shard-0&authSource=admin&retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

app.use(express.json());
app.use(routes);



app.listen(3333);