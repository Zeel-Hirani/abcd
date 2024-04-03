const express = require("express");
const router = express.Router();
const token = require("../../utils/verifytoken");
const upload = require('../../utils/multer');
const errorH = require('../../utils/errorhandling');

const admin1 = require('../../utils/admine')
const admin2 = require('../../utils/onlyadmin')
const book = require("../../controller/book.controller");
router.use(express.static(__dirname+"../../uploads"))
router.post("/createbook",upload.uploadimage, token.verifytoken(["user"]), book.bookcreate);

router.put("/updatebook/:id",token.verifytoken(["admin","user"]),book.bookupdate);

router.delete("/deletebook/:id", token.verifytoken,admin1.onlyadmin, book.bookdelete);

router.delete("/deleteadmin/:id", token.verifytoken(["admin","user"]), book.deletebookadmin);

router.get("/userbook/:tital",errorH.errorhand,token.verifytoken, book.userbook);

router.get("/allbook",token.verifytoken, book.allbook);

router.post("/upload",upload.uploadimage,book.uploadimage);

module.exports = router;
