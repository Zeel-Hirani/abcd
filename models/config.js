const mongoose = require("mongoose")
const connect = mongoose.connect("mongodb://127.0.0.1:27017/Login&signup")

connect.then(()=>{
    console.log("Database connected successfully");
})
.catch(()=>{
    console.log("Database can not connected");
})
