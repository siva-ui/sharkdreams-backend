const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const signupmodel = require('../models/signup')
const userModel = mongoose.model('signUp')
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')
const checkauth = require('../middleware/checkauth')
const shortId = require('shortid')
////api////
router.post('/signup', (req, res) => {
    let userDetails
    userModel.findOne({ userName: req.body.userName }).then(user => {
        userDetails = user
        if(user){
            let statusObject = {
                message: "User already exist, login to continue",
                result: null,
                error: null,
                status: 401
            }
        return res.send(statusObject)
        }
        bcryptjs.hash(req.body.password, 10).then(hash => {
            var userDetails = new userModel({
                name: req.body.name,
                userName: req.body.userName,
                password: hash,
                userId: shortId.generate()
            })
            userDetails.save((err, data) => {
                if(err){
                    let statusObject = {
                        message: "Error",
                        result: null,
                        error: err,
                        status: 400
                    }
                    return res.send(statusObject)
                }else{
                    let statusObject = {
                        message: "User Created Successfully",
                        result: data,
                        error: null,
                        status: 200
                    }
                    return res.send(statusObject)
                }
            })
            })
        })
    })


    router.post('/login', (req, res) => {
        let userDetails
        userModel.findOne({ userName: req.body.userName }).then(user => {
            userDetails = user
            if (!user) {
                console.log("User not Exist")
                let statusObject = {
                    message: "User not found",
                    status: 400,
                    token: null,
                    result: null,
                    error: null
                }
                return res.send(statusObject)
            }
    
            bcryptjs.compare(req.body.password, userDetails.password).then(isMatchPassword => {
                if (!isMatchPassword) {
                    let statusObject = {
                        message: "Invalid Password",
                        status: 400,
                        token: null,
                        result: null,
                        error: null
                    }
                    return res.send(statusObject)
    
                }
                let token = jwt.sign({ userName: userDetails.userName, userId: userDetails._id },
                    'thisissecretkeyfortokengeneration')
                if (token) {
                    let statusObject = {
                        message: "Login Successful",
                        status: 200,
                        token: token,
                        result: userDetails,
                        error: null
                    }
                    return res.send(statusObject)
                }
            })
    
        }).catch(err => {
            console.log(err)
        })
    })

module.exports = router
