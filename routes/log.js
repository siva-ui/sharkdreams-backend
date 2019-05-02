const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const logmodel = require('../models/logmodel')
const userLog = mongoose.model('logmodel')
const jwt = require('jsonwebtoken')
const checkauth = require('../middleware/checkauth')
const shortId = require('shortid')

router.post('/logsave', checkauth, (req, res) => {
    var logDetails = new userLog({
        userId: req.body.userId,
        logDescription: req.body.logDescription,
        startTimer: req.body.startTimer,
        stopTimer: req.body.stopTimer,
        logId: shortId.generate()
    })
    logDetails.save((err, data) => {
        if(data){
            let statusObj = {
                result : data,
                message : "Saved Successfully",
                error:null,
                status:200
            }
            return res.send(statusObj)
        }else{
            let statusObj = {
                result : null,
                message : "Unable to Save Data",
                error: err,
                status:400
            }
            return res.send(statusObj)
        }
    })
    
})


router.get('/loggetbyid/:id', checkauth, (req, res) => {
    userLog.find({userId: req.params.id}).then(data => {
        if(data) {
        let successObject = {
            message: "User Log Fetched Successfully",
            result: data,
            error: null,
            status: 200
        }
        return res.send(successObject)
    }else{
        let successObject = {
            message: "Unable to fetch",
            result: null,
            error: error,
            status: 400
        }
        return res.send(successObject)
    }
    })
})

router.delete('/deletelogbyid/:id', checkauth, (req, res) => {
    userLog.deleteOne({logId: req.params.id}).then(data => {
        if(data) {
        let successObject = {
            message: "Log Deleted Successfully",
            result: data,
            error: null,
            status: 200
        }
        return res.send(successObject)
    }else{
        let successObject = {
            message: "Unable to delete",
            result: null,
            error: error,
            status: 400
        }
        return res.send(successObject)
    }
    })
})
module.exports = router
