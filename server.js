// const http = require("express");
const express = require('express');
const { createServer } = require('node:http');
const { Server } = require('socket.io');
const { join } = require('node:path');

const mongoose = require('mongoose')
require("./models/config");


const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const accessTokenSecret = 'youraccesstokensecret';
// const signupController = require('./controller/signup.controller')
const bodyparser = require("body-parser");
const signup = require("./routes/api/signup");
const book= require("./routes/api/book");
const { errorhand } = require('./utils/errorhandling');
const { log } = require('node:console');


// const path = require('path')


const app = express();
const server = createServer(app)
const io = new Server(server);

app.use(express.json())
// app.use(express.static("public"));
app.use(express.urlencoded({extended: false}));
app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json())

app.use("/api/book",book)
app.use("/api", signup);
app.use(errorhand)
// var cookieParser = require('cookie-parser');
// app.use(cookieParser());

// app.get('/',function(req,res){
//     // console.log('Cookies:',req.cookies);
//     res.cookie('name','Programming Experience').send('cookie set');
//     // res.cookie('name','Programming Experience',{maxAge:10000});
//    res.send('Cookie set ');
// });
// app.get('/clear',function(req,res){
//     res.clearCookie('name');
//     res.send('cookie are clear')
    
// })




// app.set('view engine','ejs');
// // app.use(express.json()); 
// app.get("/profile",function(req,res){
// //    res.render('profile')
// // console.warn(req.params.name);
// res.render("profile ")
//     // res.sendFile(__dirname + '/zeel.html') 
// })

// app.listen(4444,()=>{
//     console.log('app is running on 4444');
// });
app.get('/', (req, res) => {
    res.sendFile(join(__dirname, 'zeel.html'));
  });
io.on('connection', (client) => {
  console.log('a user connected');
  client.on('disconnect', () => {
    console.log('user disconnected');
  });
});


io.on('connection', (socket) => {
    
    socket.on('message', (msg) => {
        console.log(msg);
        socket.broadcast.emit('message', msg)
    })

})
// io.on('connection', (client) => {
//     client.on('chat message', (msg) => {
//       console.log('message: ' + msg);
//       io.emit('chat message', msg);
//     });
//   });

server.listen(4444,()=>{
    console.log('app is running on 4444');
});






// app.post('/signup',async(req,res)=>{
//     const {name,email,password} = req.body;
//     try{
//         const newuser = await User.findOne({email:email});
//         if(newuser){
//             return res.status(400).json({message:"User already exists"});
//         }
//         const hashedPassword = await bcrypt.hash(password,10);

//         const result = await User.create({
//             name:name,
//             password:hashedPassword ,
//             email:email
//         })
//         const token = jwt.sign({email:result.email,id:result._id},accessTokenSecret)
//         res.status(201).json({user:result,token: token});
//         console.log(token);
//     }catch(error){
//          console.log(error);
//          res.status(500).json({message: "Something went wrong"});
//     }
// })

// app.post('/Signup', async(req,res)=>{
//     // const {name,email,password} = req.body;
//     try{
//         // const data = {
//         //     name:req.body.username,
//         //     email:req.body.email,
//         //     password:req.body.password
//         // }
//         const existingUser = await User.findOne({name: req.body.name});
//         if(existingUser){
//             res.send("User already exists.Please choose a different username")
//         }else{
//             const saltRounds = 10;
//             const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);
//             req.body.password = hashedPassword;
//         //    console.log("data===",data)
//             const userdata = await User.create(req.body);
//             console.log(userdata);
            
//             const token = jwt.sign({name:userdata.name,id :userdata},accessTokenSecret );
//             res.status(201).json({message:"Register sucessfully"})  
//             console.log(token)
            
//         }
//     }catch(error){
//         console.log(error);
//         res.status(500).json({message:'something went wrong'})
//     }
       
// });
// app.post('/Signup', async(req,res)=>{
//     // const {name,email,password} = req.body;
    
       
// });


// signupToken();
  
// app.post('/Login',async(req,res)=>{
   
// })
// app.post("/signup",signupController.signup);


// module.exports = router;
