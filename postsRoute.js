const express = require('express')
const Post = require('./models/Post')
const UserInfo = require('./models/UserInfo')

const router = express.Router()

router.get('/',(req,res)=>{
    Post.find().then(data=>{
        res.json(data)
    })
})

router.post('/',(req,res)=>{
    let post = new Post(req.body)
    post.save()
    res.json({message : 'RECEIVED'})
})

router.put('/update',(req,res)=>{
    // console.log(req.body)
    UserInfo.updateOne({username : req.body.username},{$set:{profilepic:req.body.imgStr}}).then(data=>console.log(data))
    res.json({message : 'RECEIVED'})
})

module.exports = router