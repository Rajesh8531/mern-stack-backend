
require('dotenv').config()
const express = require('express');
const cors = require('cors')
const bodyParser = require('body-parser')
const app = express();
const mongoose = require('mongoose')
const User = require('./models/User')
const UserInfo = require('./models/UserInfo')
const session = require('express-session')
const passport = require('passport')
const postRoute = require('./postsRoute')
const userRoute = require('./UserInfoRoute')
const Post = require('./models/Post')

app.use(session({
    resave:false,
    secret:'The little Secret.',
    saveUninitialized:false
}))

app.use(bodyParser.json({limit: '50mb'}))

app.use(passport.initialize())
app.use(passport.session())

app.use(cors())  
app.use(bodyParser.urlencoded({extended:true}))

mongoose.connect(process.env.CONNECTION_STRING).then(()=>{console.log("Connected Successfully")}).catch(err=>{console.log(err)})

passport.use(User.createStrategy())
passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())

app.use('/post',postRoute)

app.use('/getuser',userRoute)

app.get('/', (req, res)=>{
    res.send("Welcome to root URL of Server");
});


app.post('/register', (req, res)=>{
    let userInfo = new UserInfo({
        username : req.body.username,
        fullname : req.body.name
    })
    userInfo.save()
    User.register({username : req.body.username},req.body.password,(err,user)=>{
        if(err){
            console.log(err)
            res.json({message : "The given username was already existing."})
        } else {
            passport.authenticate('local')(req,res,()=>{
                res.json({message:true,data:userInfo})
            })
        }
    })
});

app.post('/login',(req,res)=>{
    const user = new User({
        username : req.body.username,
        password : req.body.password
    })
    req.login(user, (err)=>{
        if(err){
            console.log(err)
        } else {
            passport.authenticate('local')(req,res,()=>{
                UserInfo.findOne({username : req.body.username}).then(data=>{
                    res.json({message:true,data:data})
                })
            }) 
        }
    })
})


app.get('/logout',(req,res)=>{
    req.logout((err)=>{
        if(err){
            console.log(err)
        } else {
            console.log('Logged out')
        }
    })
    res.redirect('/')
})


app.listen(process.env.PORT, () =>{
    console.log(`Listening on port ${process.env.PORT}`)
});