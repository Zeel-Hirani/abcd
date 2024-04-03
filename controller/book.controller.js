const book = require("../models/book");
const mongoose = require("mongoose");
// const mongodb = require("mongodb");
const jwt = require("jsonwebtoken");
const accessTokenSecret = "youraccesstokensecret";

const bookcreate = async (req, res) => {
  try {
    const data = {
      tital: req.body.tital,
      decription: req.body.decription,
      isPublish: req.body.isPublish,
      image: req.file.path,
      createdBy: req.user,
    };
    if(!data.tital){
      return res.status(404).json({ message: "please tital field require"});
    }
    if(!data.decription){
      return res.status(404).json({ message: "please decription field require"});
    }
    if(!data.isPublish){
      return res.status(404).json({ message: "please isPublish field require"});
    }
    const user = await book.create(data);
    res.status(200).json(user);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
};
// const bookupdate = async (req, res) => {
//   try {
//     const update = await book.findByIdAndUpdate(
//       { _id: req.params.id },
//       {
//         $set: {
//           tital: req.body.tital,
//           decription: req.body.decription,
//           isPublish: req.body.isPublish,
//           createdBy: req.user,
//         },
//       }
//     );

//     res.status(200).json(update);
//   } catch (error) {
//     console.log(error.message);
//     res.status(500).json({ message: error.message });
//   }
// };
const bookupdate = async (req, res) => {
  try {
    const user = req.userId;
    const dataId = req.params.id;
    const abc = await book.findOne({ _id: dataId });
    if (!abc) {
      console.log(abc);
      return res.status(404).json({ error: "Data not found or unauthorized" });
    }
    if(!req.body.tital){
      return res.status(404).json({ error: "please tital require" });
    }
    if(!req.body.decription){
      return res.status(404).json({ error: "please decription require" });
    }
    if(!req.body.isPublish){
      return res.status(404).json({ error: "please isPublish require" });
    }

    if (req.user.role == "admin") {
      await book.findByIdAndUpdate(dataId, {
        
        $set: {
          tital: req.body.tital,
          decription: req.body.decription,
          isPublish: req.body.isPublish,
        },
        
      });
      return res.json({ message: "Data update successfully by admin" });
    } else {
      if (abc.createdBy.id !== user) {
        console.log(abc);
        return res
          .status(403)
          .json({ error: "Unauthorized to update this document" });
      }
      
     
      await book.findByIdAndUpdate(dataId,{ $set: {
        tital: req.body.tital,
        decription: req.body.decription,
        isPublish: req.body.isPublish,
        // image:req.body.file
        
      },});
      console.log(dataId);
      res.json({ message: "Data update successfully" });
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
};
const bookdelete = async (req, res) => {
  try {
    const book1 = await book.deleteOne({ _id: req.params.id });
    // res.status(200).json({message:"delete successfully data"});
    res.status(200).json(book1);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
};
// const deletebookadmin = async (req, res) => {
//   try {
//     console.log("1111111111111", req.user);
//     const book1 = await book.deleteOne(req.user._id);
//     res.status(200).json(book1);
//   } catch (error) {
//     console.log(error.message);
//     res.status(500).json({ message: error.message });
//   }
// };

const deletebookadmin = async (req, res) => {
  // const user = req.user.id;
  const user = req.userId;
  const dataId = req.params.id;
  try {
    const abc = await book.findOne({ _id: dataId });
    if (!abc) {
      console.log(abc);
      return res.status(404).json({ error: "Data not found or unauthorized" });
    }
    if (req.user.role == "admin") {
      await book.findByIdAndDelete(dataId);
      res.json({ message: "Data deleted successfully by admin" });
    } else {
      if (abc.createdBy.id !== user) {
        console.log(abc);
        return res
          .status(403)
          .json({ error: "Unauthorized to delete this document" });
      }

      await book.findByIdAndDelete(dataId);
      console.log(dataId);
      res.json({ message: "Data deleted successfully" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
const userbook = async (req, res, next) => {
  try {
    const userbook = await book.find({ tital: req.params.tital });
    res.status(200).json(userbook);
  } catch (error) {
    // console.log(error.messag{ message: error.message });
    // const err = new Error('This is a sample error');
    // const status = 422;
    // const message = "error";
    // const details = err.errors[0].message;
    // const error = {
    //   status,
    //   message,
    //   details
    // };
    // console.log(error);e);
    // res.status(500).json(
    const err = "This is a sample error";
    next(err);
  }
};

// const allbook = async(req,res)=>{
//   try{
//     // const { id } = req.query;
//     const allbook = await  book.find({})
//     res.status(200).json(allbook)
//   }catch(error){
//   console.log(error.message);
//   res.status(500).json({ message: error.message });
//   }
// }

const allbook = async (req, res) => {
  try {
    let { tital, decription, isPublish, createdBy } = req.query;

    const allbook = await book.find(req.query);
    res.status(200).json(allbook);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
};
const uploadimage = async (req, res) => {
  try {
    // var  imagefile = req.file.filename;
    // var success = req.file.filename+" upload successfully";
    // var image = new book({image:imagefile})
    console.log(req.file);
    res.send(`file uploaded===>${req.file.path}`);
  } catch {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
};
module.exports = {
  bookcreate,
  bookupdate,
  bookdelete,
  deletebookadmin,
  userbook,
  allbook,
  uploadimage,
};
