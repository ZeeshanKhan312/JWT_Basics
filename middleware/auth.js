const jwt=require('jsonwebtoken');
const CustomAPIError=require('../errors/custom-error');
const { StatusCodes } = require('http-status-codes');

const jwtAuthentication=(req,res,next)=>{
    const authHeader=req.headers.authorization;
    // console.log(authHeader);
    if(!authHeader || !authHeader.startsWith('Bearer ')){
        throw new CustomAPIError("No Token found",StatusCodes.NOT_FOUND);
    }
    const token=authHeader.split(' ')[1];
    //VERIFYING THE TOKEN 
    try{
        const decode=jwt.verify(token,process.env.JWT_SECRET);
        const {userName,id}=decode;
        console.log(id);
        req.user={userName,token};
        next();
    }catch(error){
        throw new CustomAPIError("Not authorized to access this route",StatusCodes.UNAUTHORIZED);
    }
}

module.exports=jwtAuthentication;