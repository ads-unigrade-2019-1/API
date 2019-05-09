const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();

mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
});

let db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("DB connected");
});

app.use(express.json());
app.use(require('./routes'));

app.listen(process.env.PORT != null ? process.env.PORT : 3000, ()=>{
  console.log('Server started on port '+ process.env.PORT  + '!');
});
