const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const db = require('./config/database');
const User = require('./models/User')

const app = express();

//middleware
app.use(express.json())

//Port
const PORT = process.env.PORT || 4000;

//routes

app.get('/users', async (req,res)=>{
    try{
        const users = await User.find();
        
        return res.status(200).json(
            {
                success: true,
                message: 'Get all users retrieved succcesfully',
                data: users
            }
        );
    }catch (error) {
        return res.status(500).json(
            {
                success: false,
                message: 'Error retrieving users',
                error: error.message
            }
        )
    }
})

app.post('/users', async(req,res)=>{
    try{
        const {username,email,password} = req.body;
        const newUser = {
            username,
            email,
            password
        }
        await User.create(newUser);
        return res.status(200).json(
            {
                success: true,
                message: 'Create user succesfully'
            }
        )
    }catch(error){
        return res.status(500).json(
            {
                success: false,
                message: 'Error creating user',
                error: error?.message || error
            }
        )
    }
})

app.get('/', (req, res)=> {
    return res.send('Bienvenidos a mi aplicacion de tareas');
});

app.get('*',(req,res)=>{
    return res.status(404).send('404 route not found')
})

//connect database

db().then(()=>{
app.listen(PORT, ()=> console.log('Server is running in ' + PORT));
}).catch((error)=>{
    console.log('Error connecting to mongoDB ', error);
})
