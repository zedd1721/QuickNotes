const jwt = require("jsonwebtoken");
const userModel = require('../models/userModel')
async function authMiddleware(req, res, next) {
    let token;
    //Checking token is sent in header "Authorization"
    if(req.headers.authorization && req.headers.authorization.startsWith("Bearer")){
        try{
            token = req.headers.authorization.split(" ")[1]; //"Bearer 6565445654gdfhgj5h64t" Extrating only token

            const decoded =  jwt.verify(token, process.env.JWT) //VErifying token

            req.user = await userModel.findById(decoded.id).select("-password"); //Attaching user

            next();
    
        }catch(err){
            return res.status(401).json({message: `Something went wrong: ${err.message}`});
        }

    }
    if(!token){
        return res.status(401).json({ message: "No Token, Authorization Denied" })
    }
}

module.exports = authMiddleware;