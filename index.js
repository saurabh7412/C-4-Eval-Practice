const express = require('express');

const mongoose = require('mongoose');

const dotenv = require('dotenv');

dotenv.config();

const userRoute = require('./Routes/userRoute');

const articleRoute = require('./Routes/articleRoute');

const limiter = require('./MiddleWares/ratelimiter');

const app = express();

app.use(express.json());

app.use(limiter);

app.use("/user",userRoute);

app.use('/articles',articleRoute)


app.get('/',(req,res)=>{
    res.status(200).send("Welcome to homepage")
})





app.listen(process.env.PORT, ()=>{
    connect();

    console.log('Listening to port ...');
})

const connect = async()=>{
    try {
        await mongoose.connect(process.env.MONGO_URL);

        console.log('connected to db...');
    } catch (error) {
        console.log(error);
    }
}

