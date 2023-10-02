const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserInfo = new Schema({
    username : String,
    fullname : String,
    profilepic : String
})

module.exports = mongoose.model('UserInfo',UserInfo)