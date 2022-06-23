const jwt = require('jsonwebtoken');
const isSuperAdmin = (req,res,next)=>{
    try{
        if(req.user_role !== 'super_admin'){
            return res.status(401).json({
                success: false,
                message: 'Dont have user permissions2'
            })
        }
        next();
    }catch(error){
        return res.status(500).json({
            success: false,
            message: 'Dont have user permissions3'
        })
    }
}

module.exports = isSuperAdmin;