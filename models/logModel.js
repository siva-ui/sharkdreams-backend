const mongoose = require('mongoose')
schema = mongoose.Schema

logModel = new schema({
    startTimer: String,
    stopTimer: String,
    logDescription: String,
    userId: String,
    logId: String
})
mongoose.model('logmodel', logModel)