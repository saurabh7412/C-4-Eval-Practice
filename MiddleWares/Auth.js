
const jwt = require('jsonwebtoken');

const user = require('../Models/userModel');


const Auth = async(req,res,next)=>{
    const token = req.headers.authorization;

    if(!token) {
       return res.status(400).send('Login first !')
    }

    const decoded = jwt.verify(token,'abc');

    if(!decoded){
        return res.status(400).send('user not authorized !')
    }
    else{
        const result = await user.findById(decoded.userID);

        if(result){
            req.body.userID = decoded.userID;
            req.body.user = decoded.email;
            next()
        }else{
            return res.status(400).send('User donot exist !')
        }
    }


}


module.exports = Auth;


