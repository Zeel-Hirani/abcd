const mongoose = require("mongoose")
// const Schema = mongoose.Schema;
//Create a schema
const BookSchema = new mongoose.Schema({
    tital:{
        type: String,
        require:true
    },
    decription:{
        type: String,
        require:true
    },
    isPublish:{
        type: Number,
        require:true
    },
    image:{
        type:String,
        require:true
    },
    createdBy:{
    //    type: Schema.Types.objectId,
       type: Object,
       require:true,
        // email:String,
        // id:String,
        // role:String
   }
})

//collection port
const book =  mongoose.model("book",BookSchema);
module.exports = book;