const jwt = require('jsonwebtoken')


const verifyToken = (req, res) =>{
    const token = req.cookies.access_token;
    if(!token){
        return res.status(400).json({msg:"You are not authorized! "})
    }
    jwt.verify(token, process.env.JWT_SECRET, (err, user) =>{
        if(err){
            return res.status(401).json({ msg: "Token is not valid!"})
        }
        req.user = user
        next()
    })
}

const verifyUser = (req, res) => {
        verifyToken(req, res, () =>{
            if(req.user.id === req.params.id){
                next()
            }else{
                return res.status(400).json({msg:"You are not authorized! "})
            }
        })
}

module.exports = {
    verifyToken,
    verifyUser
}