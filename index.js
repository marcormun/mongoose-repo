const express = require('express');
const mongoose = require('mongoose');

const app = express();
mongoose.connect('mongodb://127.0.0.1:27017/test')
    .then(()=> console.log('Connexion established'))
    .catch((error)=> console.log('Error connetcing to MongoDB', error));

//routes

app.get('/', (req, res)=> {
    return res.send('Bienvenidos a mi aplicacion de tareas');
});

app.listen(3000, ()=> console.log('Server is running'));