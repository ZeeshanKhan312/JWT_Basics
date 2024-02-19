const CustomAPIError=require('../errors/custom-error')
const jwt=require('jsonwebtoken');
const { StatusCodes } = require('http-status-codes');

let tokenNo;
const login=async(req,res)=>{
    const {username,password}=req.body;
    //{ mongoose validation with database } 
    if(!username || !password)
    throw new CustomAPIError("Please Enter Username and Password",StatusCodes.BAD_REQUEST);
    // throw new Error('Please Enter Username and Password')  //USING THIS WE CAN'T SENT THE ERROR CODE

    const id=new Date().getTime();
    //keep payload small, better experience for user
    tokenNo=jwt.sign({id, username}, process.env.JWT_SECRET,{expiresIn:'30d'})
    res.status(200).json({msg:"token generated successfully",tokenNo});
}

const dashboard=async(req,res)=>{
    const user=req.user;
    let luckyNumber=Math.floor(Math.random()*100);
    res.status(200).json({
        msg:`hii ${user.username} your lucky number is ${luckyNumber}`, tokenNo: user.token
    })
}

module.exports={login,dashboard}; 