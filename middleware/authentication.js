const {isTokenValid} = require('../utils/jwt')

const authenticateUser = async (req,res,next)=>{
    const token = req.signedCookies.token;
    if(!token){
        return res.status(404).json({msg:`Authentication failed`})
    }
    try {
        const {payload} = isTokenValid({token})
        // console.log({payload})
        // console.log(pay);
        req.user = { name: payload.name, email:payload.email, userId:payload.userId, role: payload.role }
        next();
    } catch (error) {
        res.status(500).json({msg:`Authentication failed`})
    }
}

const authorizePermissions = (...roles) =>
(req,res,next)=>{
    if(!roles.includes(req.user.role)){
        res.status(401).json({msg:`You are not authorized`})
        next();
    }
    next()
}

module.exports = {
    authenticateUser,
    authorizePermissions
}