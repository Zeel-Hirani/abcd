const mongoose = require("mongoose");
const validator = require("validator")
//Create a schema
const LoginSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    // lowercase:true,
    // minlength:[2,"minimum 2 character"],
    // maxlength:[7, "maximum 7 character"]
  },
  email: {
    type: String,
    require: true,
    // unique:true,
    // validate(value){
    //   if(!validator.isEmail(value)){
    //   //   return res.status(404)
    //   //   .json({message:"Email is invalid"})
    //     throw new Error("Email is not valid")
    //   }
    },

  // },
  // },
  password: {
    type: String,
    require: true,
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
});

//collection port
const User = mongoose.model("User", LoginSchema);
module.exports = User;
