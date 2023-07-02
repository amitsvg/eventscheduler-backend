const jwt = require('jsonwebtoken')
const dotenv = require('dotenv');
dotenv.config();
const mongoose = require('mongoose')
const USER = mongoose.model("USER");



module.exports = (req, res, next) => {
    const {authorization } = req.headers;
    if(!authorization){
        return res.status(401).json({error:"You must be logged in"})
    }
    const jtoken = authorization.replace("Bearer ", "");
    jwt.verify(jtoken, process.env.JWT_SECRET, (err, payload) => {
        if(err){
            return res.status(401).json({error: "You must have logged in first"})

        }
        const {_id} = payload
        USER.findById(_id).then((userData) => {
            // console.log(userData)
            req.user = userData
            next()
        })
    } )
}