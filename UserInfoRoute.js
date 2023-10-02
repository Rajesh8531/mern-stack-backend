const express = require('express')
const UserInfo = require('./models/UserInfo')

const router = express.Router()

router.get('/:id',(req,res)=>{
    UserInfo.find({username:req.params.id}).then(data=>{
        return res.json({STRING:data[0].profilepic})})
})

module.exports = router