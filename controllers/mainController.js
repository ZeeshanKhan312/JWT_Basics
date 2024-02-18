const CustomAPIError=require('../errors/custom-error')
const jwt=require('jsonwebtoken');

let tokenNo;
const login=async(req,res)=>{
    const {username,password}=req.body;
    //{ mongoose validation with database } 
    if(!username || !password)
    throw new CustomAPIError("Please Enter Username and Password",400);
    // throw new Error('Please Enter Username and Password')  //USING THIS WE CAN'T SENT THE ERROR CODE

    const id=new Date().getTime();
    //keep payload small, better experience for user
    tokenNo=jwt.sign({id, username}, process.env.JWT_SECRET,{expiresIn:'30d'})
    res.status(200).json({msg:"token generated successfully",tokenNo});
}

const dashboard=async(req,res)=>{
    const authHeader=req.headers.authorization;
    console.log(authHeader);
    if(!authHeader || !authHeader.startsWith('Bearer ')){
        throw new CustomAPIError("No Token found",401);
    }
    tokenNo=authHeader.split(' ')[1];
    //VERIFYING THE TOKEN 
    try{
        const decode=jwt.verify(tokenNo,process.env.JWT_SECRET);
        console.log(decode);
        let luckyNumber=Math.floor(Math.random()*100);
        res.status(200).json({
            msg:`hii ${decode.username} your lucky number is ${luckyNumber}`, tokenNo: tokenNo
        })
    }catch(error){
        throw new CustomAPIError("Not authorized to access this route",402);
    }
}

module.exports={login,dashboard}; 