const mongoose = require('mongoose')
schema = mongoose.Schema

userModel = new schema({
    name: String,
    userName: String,
    password: String,
    userId: String
})
mongoose.model('signUp', userModel)