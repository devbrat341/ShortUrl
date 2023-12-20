const User = require('../models/userModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

/**
 * Creates a new user object in the DB
 * POST:
 * {
 *  "useName": "String",
 *  "password": "Abc123!"
 * }
*/
const register = async (req, res, next) =>{
    const {userName, password} = req.body;
    if(!userName  || !password){
        return res.status(400).json({msg:"invalid credencials"});
    }
    const userExist = await User.findOne({userName})
    if(userExist) {
        return res.status(400).json({msg:"User  already exist"})
    }
    try{
        const salt = bcrypt.genSaltSync(10)
        const hashPass = bcrypt.hashSync(password, salt)
        
        const newUser = new User({
            userName,
            password:hashPass
        })
        await newUser.save()
        res.status(200).json({msg: "register sucessfully"})
    }catch(err){
        next(err)
    }

}


/**
 * Logs a user in
 * POST:
 * {
 *  "userName": "",
 *  "password": ""
 * }
 */
const login = async (req, res, next) =>{
    const {userName} = req.body;
    try{
        const isExist = await User.findOne({userName})
        if(!isExist){
            return res.status(400).json({msg:"Wrong credentials"});
        }
        const isPassCorr = await bcrypt.compareSync(req.body.password, isExist.password)
        if(!isPassCorr){
            return res.status(400).json({msg:"Wrong credentials"});
        }
        const token = jwt.sign(
            {id:isExist._id}, process.env.JWT_SECRET, {expiresIn: '24h'}
        );
        const {password, ...details} = isExist._doc;
        res.cookie("access_token", token, {
            httpOnly:true
        }).status(200).json({msg:"Login Suessfully", details : {...details}})
    }catch(err){
        next(err)
    }
    
}


module.exports = {
    register,
    login
}