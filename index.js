const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();

//Port
const PORT = process.env.PORT || 4000

//routes

app.get('/', (req, res)=> {
    return res.send('Bienvenidos a mi aplicacion de tareas');
});

//connection mongodb

mongoose.connect(process.env.MONGO_URI)
    .then(()=> console.log('Connexion established'))
    .catch((error)=> console.log('Error connetcing to MongoDB', error));


app.listen(PORT, ()=> console.log('Server is running in' + PORT));