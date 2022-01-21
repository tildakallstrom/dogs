//require('dotenv').config();
const express = require('express');
const app = express()
const mongoose = require('mongoose');

var cors = require('cors')

app.use(cors())

//process.env.DATABASE_URL
mongoose.connect('mongodb+srv://admin:admin@cluster0.t143q.mongodb.net/dogs?retryWrites=true&w=majority'), {
    useNewUrlParser: true
    
};
const db = mongoose.connection
db.on('error', (error) => console.error(error))
db.once('open', () => console.log('Connected to database'))

app.use(express.json())

const dogsRouter = require('./routes/dogs');
app.use('/dogs', dogsRouter)
//const port = process.env.PORT;
//app.listen 'https://radiant-sands-33441.herokuapp.com/subscribers'
app.listen(process.env.PORT, () => console.log('Server started'));