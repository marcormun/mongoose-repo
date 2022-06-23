const authController = {};
const User = require("../models/User");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

authController.register = async(req,res)=>{
    try{
        const {username,email,password} = req.body;

        //Validar campos
        if(!username || !email || !password){
            return res.status(400).json({
                success: false,
                message: 'Email, name, password are required'
        })
        }
        if(password.length<6 || password.length>10){
            return res.status(404).json({
                    success: false,
                    message: 'Password length must be between 6 and 10 characters'
            })
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
authController.login = async (req,res)=>{
    try{
        const {email, password} = req.body;
        if(!email || !password){
            return res.status(400).json({
                    success: false,
                    message: 'Email and password are required'  
            })
        }
        const user = await User.findOne({email});

        if(!user){
            return res.status(400).json({
                    success: false,
                    message: 'Bad credentials'  
            })
        }

        const isValidPassword = bcrypt.compareSync(password, user.password);

        if(!isValidPassword){
            return res.status(401).json({
                    success: false,
                    message: 'Bad credentials'  
            })
        }
        const token = jwt.sign({user_id : user._id,user_role: user.role}, process.env.JWT_SECRET, {expiresIn: '5h'});
        console.log(token);
        return res.status(200).json({
                success: true,
                message: 'User logged',
                token: token  
        })
    }catch(error){
        return res.status(500).json({
                success: false,
                message: 'Error logging',
                error: error?.message || error
        })
    }
}
authController.profile = async (req,res) => {
    try{
        const userId = req.user_id;

        const user = await User.findById(userId).select(['-password','-__v']);

        return res.status(200).json({
            success: true,
            message:"User profile",
            data: user
        })
    }catch(error){
        return res.status(500).json({
            success: false,
            message: 'User profile failed',
            error: error?.message || error
    })
    }
}

module.exports = authController;