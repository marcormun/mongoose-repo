const express = require('express');
require('dotenv').config();
const db = require('./config/database');
const userRouter = require('./routes/user.routes')
const authRouter = require('./routes/auth.routes')

const app = express();

//middleware
app.use(express.json())

//Port
const PORT = process.env.PORT || 4000;

//routes
app.use('/api', userRouter);
app.use('/api', authRouter);



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
