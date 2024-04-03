 const errorhand = (err,req,res,next)=>{
    // const status = err.status | 500;
    // const message = err.message | "server error";
    // const details = err.details | "error from server"


    // return res.status(status).json({message,details});
     
  console.error(err);

 
  res.status(500).json({
    error: {
      message: err.message || 'Internal Server Error'
    }
  });
  next();
 };
    


module.exports = {errorhand}