const User = require('../models/user.js');
// const jwt = require('jsonwebtoken')
const {createJWT, attachCookiesToResponse} = require('../utils/jwt')
const register= async(req, res)=>{
    try {
        const {email,name,password} = req.body;
        const emailAlreadyExists = await User.findOne({email})
        if(emailAlreadyExists){
            return res.status(404).json({msg: `email already exist`})
        }

        const isFirstAccount = (await User.countDocuments({}))===0;
        const role = isFirstAccount? 'admin':'customer';
        const user = await User.create({name, email, password, role});
        const tokenUser = { name: user.name, userId:user._id, role: user.role, storeId: user.storeId }
        // const token = jwt.sign(tokenUser,'jwtSecret',{expiresIn: '1d'})
        const token = createJWT({payload:tokenUser});
        //create jwt - jwt.sign(payload,secret,options)
        //verify jwt - jwt.verify(token,secret)
        // const oneDay = 1000*60*60*24

        // res.cookie('token',token,{
        //     httpOnly:true,
        //     expires:new Date(Date.now()+oneDay),
        // })
        attachCookiesToResponse({res,user:tokenUser})
        res.status(200).json({user:tokenUser,token})
    } catch (error) {
        res.status(500).json({ msgR: error.message })
    }
}
const login = async(req, res)=>{
    const {email,password}=req.body;
    if(!email||!password){
        return res.status(404).json({msg:`email not found`})
    }
    const user = await User.findOne({email});
    if(!user){
        return res.status(404).json({msg:`invalid Credentials`})
    }
    const isPasswordCorrect = await user.comparePassword(password)
    if(!isPasswordCorrect){
        return res.status(404).json({msg:`invalid Credentials`})
    }
    const tokenUser = { name: user.name, email:user.email, userId:user._id, role: user.role }
        const token = createJWT({payload:tokenUser})
        attachCookiesToResponse({res,user:tokenUser})
        res.status(200).json({user:tokenUser,token})
};
const logout= async(req,res)=>{
    res.cookie('token','logout',{
        httpOnly:true,
        expires:new Date(Date.now())
    });
    res.json({msg:`user logged out`})
};

module.exports = {
    register,
    login,
    logout
};