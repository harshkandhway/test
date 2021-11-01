const User = require('../models/user.js');
const {checkPermissions} = require('../utils/checkPermissions');

const getAllUsers = async (req, res) => {
    // console.log(User.schema)
    try {
        console.log(req.user);
        const user = await User.find({role:'user'}).select('-password')
        res.status(200).json({ user })
    }
    catch (error) {
        res.status(500).json({ msg: error.message })
    }
}

const getSingleUser = async (req, res) => {
    try {
        const { id: userID } = req.params
        const user = await User.findOne({ _id: userID }).select('-password')
        if (!user) {
            return res.status(404).json({ msg: `No user with id: ${user}` })
        }
        //bug
        const isPermission = checkPermissions(req.user, user._id);
        if(isPermission)
        res.status(200).json({ user })
        else
        return res.status(401).json({msg:`You are not authorized to check different user`})
    }
    catch (error) {
        res.status(500).json({ msgqq: error })
    }
}

const showCurrentUser = async (req, res) => {
    res.status(200).json({ user: req.user });
}

const updateUser = async (req,res)=>{
    try{
        const {userID} = req.params
        // console.log(req.body);
        // console.log(storeID);
        const user = await User.findOneAndUpdate({_id:userID},req.body,{
            new: true,
            runValidators: true,
          })
        if(!user){
            return res.status(404).json({msg:`No user with id: ${userID}`})
        }
        res.status(200).json({user})
    }
    catch(error){
        res.status(500).json({msg:error})
    }
}

// const updateUser = async (req, res) => {
    // try{
    //     const {id:userID} = req.params
    //     console.log(req.body);
    //     console.log(userID);
    //     const user = await User.findOneAndUpdate({_id:userID},req.body,{
    //         new: true,
    //         runValidators: true,
    //       })
    //     if(!user){
    //         return res.status(404).json({msg:`No user with id: ${userID}`})
    //     }
    // res.status(200).json(`update user`)
    // }
    // catch(error){
    //     res.status(500).json({msg:error})
    // }
// }

// const updateUserPassword = async (req, res) => {
    // try{
    //     const {id:userID} = req.params
    //     console.log(req.body);
    //     console.log(userID);
    //     const user = await User.findOneAndUpdate({_id:userID},req.body,{
    //         new: true,
    //         runValidators: true,
    //       })
    //     if(!user){
    //         return res.status(404).json({msg:`No user with id: ${userID}`})
    //     }
    // res.status(200).json(`update user password`)
    // }
    // catch(error){
    //     res.status(500).json({msg:error})
    // }
// }

module.exports = {
    getAllUsers,
    getSingleUser,
    showCurrentUser,
    updateUser
}