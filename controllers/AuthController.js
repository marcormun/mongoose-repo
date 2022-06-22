const authController = {};
const User = require("../models/User");
const bcrypt = require('bcrypt');

authController.register = async(req,res)=>{
    try{
        const {username,email,password} = req.body;
        if(password.length<6 || password.length>10){
            return res.status(404).json(
                {
                    success: false,
                    message: 'Password length must be between 6 and 10 characters'
                }
            )
        }
        //codificar password
        const salt = await bcrypt.genSalt(10);
        const encryptedPassword = await bcrypt.hash(password, salt);
        console.log(encryptedPassword);

        const newUser = {
            username,
            email,
            password: encryptedPassword
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
}
authController.login = (req,res)=>{
    return res.status(200).json(
        {
            success: true,
            message: 'User logged'  
        }
    )
}

module.exports = authController;