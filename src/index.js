const express = require('express')
const mongoose = require('mongoose');

const app = express()

mongoose.connect('mongodb+srv://unigrade:unigrade@cluster0-c4e9y.mongodb.net/test?retryWrites=true', {
    useNewUrlParser : true 
});

app.use(express.json());
app.use(require('./routes'));

app.listen(3000, ()=>{
  console.log('Server started on port 3000!')
})
