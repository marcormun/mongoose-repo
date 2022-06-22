const User = require("../models/User");

const userController = {};

userController.getAll = async (req,res)=>{
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
}

userController.createUser = async(req,res)=>{
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
}

userController.getUserById = async(req,res)=>{
    try{
        const {id} = req.params;
        const user = await User.findById(id);
        if(!user){
            return res.status(404).json(
                {
                    success: true,
                    message: 'User not found',
                    data: []
                }
            );
        };
        return res.status(200).json({
            success: true,
            message: 'User found',
            data: user
        });
    }catch(error){
        if(error?.message.includes('Cast to ObjectId failed')){
            return res.status(404).json(
                {
                    success: true,
                    message: 'User not found',
                    data: []
                }
            );
        }
        return res.status(500).json(
            {
                success: false,
                message: 'Error finding user',
                error: error.message
            }
        )
    }
}
userController.updateUser = async(req,res)=>{
    try{
        const {id} = req.params;
        const {username, email, password} = req.body;
        const newUser = {
            username,
            email,
            password
        };
        const oldUser = await User.findByIdAndUpdate(id, newUser);
        console.log(newUser);
        if(!oldUser){
            return res.status(404).json(
                {
                    success: true,
                    message: 'User not found',
                    data: []
                }
            );
        };
        return res.status(200).json({
            success: true,
            message: 'User updated',
            data: newUser
        });
    }catch(error){
        if(error?.message.includes('Cast to ObjectId failed')){
            return res.status(404).json(
                {
                    success: true,
                    message: 'User not found',
                    data: []
                }
            );
        }
        return res.status(500).json(
            {
                success: false,
                message: 'Error finding user',
                error: error.message
            }
        )
    }
}
userController.deleteUser = async(req,res)=>{
    try{
        const {id} = req.params;
        const oldUser = await User.deleteOne({_id: id});
        if(!oldUser){
            return res.status(404).json(
                {
                    success: true,
                    message: 'User not found',
                    data: []
                }
            );
        };
        return res.status(200).json({
            success: true,
            message: 'User deleted'
        });
    }catch(error){
        if(error?.message.includes('Cast to ObjectId failed')){
            return res.status(404).json(
                {
                    success: true,
                    message: 'User not found',
                    data: []
                }
            );
        }
        return res.status(500).json(
            {
                success: false,
                message: 'Error finding user',
                error: error.message
            }
        )
    }
}
module.exports = userController;