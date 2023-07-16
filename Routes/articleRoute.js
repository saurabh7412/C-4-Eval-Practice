


const express = require('express');

const router = express.Router();

const article = require('../Models/articleModel');

const bcrypt = require('bcrypt');

const jwt = require('jsonwebtoken');

const Auth = require('../MiddleWares/Auth');
const Tracker = require('../MiddleWares/tracker');






router.get('/',Tracker,Auth, async(req,res)=>{
    try {


        const {title,category,page,limit,search} = req.query;

        
        let filter = {};
        let pages = 1;
        let limits = 5;


        if(search){
            filter.title = {$regex : search, $options : 'i'};
        }else if(title){
            filter.title = title;
        }

        if(page){
            pages = page
        }
        if(limit){
            limits = limit;
        }


        
        if(category){
            filter.category = category
        }

        const skip = (Number(page) -1) * limit;

        const checkarticle = await article.find(filter).skip(skip).limit(limits);

        res.status(200).send(checkarticle);
        

    } catch (error) {
        res.status(500).send(error)
    }
})


router.post('/add',Tracker,Auth, async(req,res)=>{
    try {
        const {title,body,user,userID,category,live} = req.body;

        const newarticle = await article.create(req.body);

        res.status(200).send({msg:"Article Added !", newarticle});

    } catch (error) {
        res.status(500).send(error)
    }
})


router.get('/:id',Tracker,Auth, async(req,res)=>{
    try {
        const {id} = req.params;

        const newarticle = await article.findById(id);

        res.status(200).send({msg:"Article Found !", newarticle});

    } catch (error) {
        res.status(500).send(error)
    }
})


router.patch('/edit/:id',Tracker, async(req,res)=>{
    try {

        const {id} = req.params;

        const newarticle = await article.findByIdAndUpdate(id,req.body);

        const newart = await article.findById(id);



        res.status(200).send({msg:"Article Updated !", updated_article : newart});

        
    } catch (error) {
        res.status(500).send(error)
    }
})


router.delete('/rem/:id', Tracker,async(req,res)=>{
    try {

        const {id} = req.params;

        const newarticle = await article.findByIdAndDelete(id);

        res.status(200).send({msg:"Article Deleted !"});

        
    } catch (error) {
        res.status(500).send(error);
    }
})







module.exports = router ;