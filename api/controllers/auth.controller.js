import User from "../models/user.module.js";
import bcryptjs from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { errorhandler } from "../utils/error.js";


export const signup=async (req,res,next)=>{
const {username,email,password}=req.body;
const hashedPassword=bcryptjs.hashSync(password,10);

const newUser=new User({username,email,password:hashedPassword})
try{
await newUser.save();
res.status(201).json("user created");
}
catch(error){
  next(error)
}
};

export  const signin=async(req,res,next)=>{
    const {email,password}=req.body;
    try{
const validUser= await User.findOne({email:email})
if(!validUser)
return next(errorhandler(404,'user not found'))
const validpass=bcryptjs.compareSync(password,validUser.password);
if(!validpass) return next(errorhandler(401,'wrong credential'));
const token=jwt.sign({id:validUser._id},process.env.JWT_SECRET)
const {password:pass,...rest}=validUser._doc;

res.cookie('access_token', token,{httpOnly:true}).status(200)
.json(rest);



    }
    catch(error){
        next(error);
    }
}
export const google=async (req,res,next)=>{

try {
    const user=await User.findOne({email:req.body.email})
if(user){
    const token= jwt.sign({id:user._id},process.env.JWT_SECRET);
 const {password:pass,...rest}=user._doc;

    res.cookie('access_token',token,{httpOnly:true})
    .status(200)
    .json(rest)

}
else{
    const generatedPass=Math.random().toString(36).slice(-8)+Math.random().toString(36).slice(-8);
const hashedPassword=bcryptjs.hashSync(generatedPass,10);
const newUser= new User({username:req.body.name.split(' ').join("").toLowerCase()+Math.random().toString(36).slice(-4),email:req.body.email,password:hashedPassword,
avatar:req.body.photo,
})
await newUser.save();
const token=jwt.sign({id:newUser._id},process.env.JWT_SECRET)

const {password:pass,...rest}=newUser._doc;

res.cookie('access_token',token,{httpOnly:true})
.status(200)
.json(rest)

}
}
catch(error){
    next(error)
}

}
export const signout=async (req,res,next)=>{
try{
    res.clearCookie('access_token');
res.status(200).json('user hass been logged out successfully!')
}
catch(error){
    next(error)
}
}
