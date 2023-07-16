
const express = require('express');

const router = express.Router();

const user = require('../Models/userModel');

const bcrypt = require('bcrypt');

const jwt = require('jsonwebtoken');
const check = require('../MiddleWares/check');
const Tracker = require('../MiddleWares/tracker');


router.post('/register', Tracker,check, async(req,res)=>{
    try {

        const {password} = req.body;

        if(!/[A-Z]/.test(password) || !/[0-9]/.test(password) || !/[!@#$%^&*()<>?]/.test(password) || password.length < 8){
            res.status(400).send('Not a Valid Password !')
        }


        const newpass = await bcrypt.hash(password,10);

      const newuser =  await user.create({...req.body, password : newpass});

        res.status(200).send({msg:"User Registered",newuser})
    } catch (error) {
        res.status(500).send(error)
    }
})


router.post('/login', Tracker,async(req,res)=>{
    try {
        const {email,password} = req.body;

        const checkUser = await user.findOne({email});

        if(!checkUser){
            res.status(400).send('user not found !')
        }

        const verify = await bcrypt.compare(password, checkUser.password);

        if(!verify){
            res.status(400).send('Wrong password !')
        }

        const token = jwt.sign({userID : checkUser._id, email : checkUser.email},'abc',{expiresIn : '4d'});

        res.status(200).send({msg : "login successful", token});

    } catch (error) {
        res.status(500).send(error)
    }
})



module.exports = router ;