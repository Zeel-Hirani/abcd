const mongoose = require("mongoose");
// const User = require("./models/user");
// const validator = require("validator")
const Joi = require("joi");
const { validationResult } = require("express-validator");
const { body } = require("express-validator");
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const encodeToken = require("../utils/encodeToken");

const accessTokenSecret = "youraccesstokensecret";
const bcrypt = require("bcrypt");

const schema = Joi.object({
  username: Joi.string().min(3).max(30).lowercase().required(),
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
    .required(),
  password: Joi.string().min(6).max(15).required(),
});

const signupuser = async (req, res) => {
  try {
    console.log("re:::", req);
    const { error, value } = schema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.message });
    }

    const data = {
      name: req.body.username,
      email: req.body.email,
      password: req.body.password,
      role: req.body.role,
    };
     console.log("==>")
    const existingUser = await User.findOne({ name: data.name });
    if (existingUser) {
      res.send("User already exists.Please choose a different username");
    } else {
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(data.password, saltRounds);
      data.password = hashedPassword;
      //    console.log("data===",data)
      const userdata = await User.create(data);
      console.log(userdata);

      // const token = jwt.sign({name:userdata.name,id :userdata},accessTokenSecret );
      // res.status(201).json({message:"Register sucessfully"})
      // console.log(token)
      if (userdata) {
        const payload = {
          name: userdata.name,
          id: userdata,
        };
        let token = await encodeToken.signupToken(payload);
        res.status(201).json({ message: "Register sucessfully" });
        console.log("token----");
        console.log(token);
        console.log("token")
      }
      // res.send(token);
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "something    went wrong" });
  }
};

const Loginuser = async (req, res) => {
  try {
    console.log("____________-------", req);

    const error = validationResult(req);
    if (!error.isEmpty()) {
      return res.status(400).json({ error: error.array() });
    }

    const { email, password, role } = req.body;

    const existingUser = await User.findOne({ email: email });
    if (!existingUser) {
      return res.status(404).json({ message: "user not found" });
    }
    const matchPassword = await bcrypt.compare(password, existingUser.password);
    console.log(matchPassword);
    if (!matchPassword) {
      return res.status(400).json({ message: "Invalid password" });
    }

    // const token = jwt.sign({email: existingUser.email,id:existingUser._id,password:existingUser.email},accessTokenSecret);
    // res.status(201).json({user: existingUser._id    ,token:token})

    const payload = {
      email: existingUser.email,
      id: existingUser._id,
      role: existingUser.role,
    };

    let token = await encodeToken.signupToken(payload, accessTokenSecret);
    res.status(201).json({ message: "Login sucessfully" });
    console.log(token);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};
module.exports = { signupuser, Loginuser };
