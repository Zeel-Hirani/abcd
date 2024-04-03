const jwt = require("jsonwebtoken");
const accessTokenSecret = "youraccesstokensecret";


// function verifytoken(req, res, next) {
//   let token = req.headers["authorization"] || req.headers["x-access-jwtToken"];

//   if (!token) {
//     return res
//       .status(403)
//       .send({ status: false, message: "No token provided", data: "" });
//   } else {
//     token = token.replace(/^Bearer\s+/, "");
//   }

//   jwt.verify(token, accessTokenSecret, (err, user) => {
//     if (err) {

//       return res.status(200).send({
        
//         status: false,
//         message: "Failed to authenticate token.",
//         data: "",
        
//       });
//     }
//     req.user = user;
//     next();
//   });
// }
function verifytoken(allowrolles){
  return function (req,res,next){
    let token = req.headers["authorization"] || req.headers["x-access-jwtToken"];

    if (!token) {
          return res
            .status(403)
            .send({ status: false, message: "No token provided", data: "" });
        } else {
          token = token.replace(/^Bearer\s+/, "");
    }
    jwt.verify(token, accessTokenSecret, (err,user) => {
          if (err) {
      
            return res.status(200).send({
              
              status: false,
              message: "Failed to authenticate token.",
              data: "",
              
            });
          }
          const userRole = user.userRole;
          const userId = user.id;

          if(userRole && !allowrolles.includes("ANY")){

            if(!allowrolles.includes(userRole)){
            return res.status(403).send({
              status: false,
              message: "Access denied. You do not have the required role.",
              data: "",
            });
          }
          
        }
          // req.loginid = user.id ;
          req.userId = userId;
          req.userRole = userRole;
          req.user = user;
          next();
    });
  };
}
module.exports = { verifytoken };
