const express = require('express')
const mongoose  = require('mongoose')
const bodyparser = require('body-parser')
const appConfig = require('./appConfig/appConfig');
const userRouter = require('./routes/user');
const logRouter = require('./routes/log')
const path = require('path')
var app = express()
app.use(bodyparser.json());
app.use(bodyparser.urlencoded ({extended:false}));

app.use((req,res,next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.setHeader("Access-Control-Allow-Methods", "PUT, POST, GET, DELETE")

    next();
})



////////////router import///////////

app.use('/user', userRouter)
app.use('/log', logRouter)



mongoose.connection.on('error', function(err){
    if(err){
        console.log(err)
    }
})
mongoose.connection.on('open', function(err){
    if(err){
        console.log(err);
    }
    else{
        console.log("Server is connected and running successfully"+ " and Port Number is " + appConfig.port)
    }
});
app.listen(appConfig.port, () => {
    let db = mongoose.connect(appConfig.db.url, ({useNewUrlParser:true}))
    console.log("Server: " + appConfig.port)
})