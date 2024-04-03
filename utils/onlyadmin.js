const book = require("../models/book")
// const onlyadmin = (req, res, next) => {
//     const userRole = req.headers.role;

// const { resolveInclude } = require("ejs");

//     if (userRole === 'admin') {
//         next(); 
//     } else if (userRole === 'user') {

//         const idToDelete = parseInt(req.params.id);
//         const userData = book.find(user => user.id === idToDelete );
//         if (userData) {
//             next();  
//         } else {
//             res.status(403).json({ message: 'Forbidden' });
//         }
//     } else {
//         res.status(401).json({ message: 'Unauthorized' });
//     }
// };
const onlyadmin =async (req,res,next)=>{
    const role = "admin"
    if(req.user.role == role){
        const error = "unauthorized access";
        next(error)
    }
    if(req.user.id){
    //    return res.status(200).json(req.user)
    
    }
    next()
}
module.exports={onlyadmin}
