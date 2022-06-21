const User = require('../models/User');
const router = require('express').Router();


router.get('/users', async (req,res)=>{
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

router.post('/users', async(req,res)=>{
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

module.exports = router;