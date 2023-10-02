const mongoose = require('mongoose')
const Schema = mongoose.Schema

const postSchema = new Schema({
    post : String,
    fullname : String,
    photo : String
},{timestamps:true})


module.exports =mongoose.model("Post",postSchema)