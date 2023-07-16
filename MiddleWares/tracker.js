
const fs = require('fs');

const Tracker = (req,res,next)=>{

    const date = Date().toString()

    fs.appendFileSync('logs.txt',`IP Address - ${req.ip} METHOD - ${req.method} URL = ${req.url} requested at - ${date}\n`)

    next()

}


module.exports = Tracker;