
const onlyadmin = (req,res,next)=>{
    const role = "user"
    if(req.user.role == role){
        const error = "unauthorized access";
        next(error)
    }
    next()
}
// const ouruser = (req,res,next)=>{
//     const id = req.params.id;

// } 
module.exports ={ onlyadmin };