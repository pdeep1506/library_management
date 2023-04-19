import jsonwebtoken from "jsonwebtoken";

const verifyLogin = async(req,res,next)=>{
    const jwt = req.cookies['jwt'];
    try{
        if(!jwt){
            jsonwebtoken.verify(jwt, process.env.JWT_KEY, (err,user)=>{
                if(err){
                    console.log("error in middleware   ", err);
                    next(err);
                }
                else{
                    // set data
                    // req.user = user; 

                    next();
                }
            })
        }
        else{
            //  jwt not found
            return res.json({error: true, data:{success: false, message:'You are not authorized.'}})
        }
        
    }
    catch(err){
        next(err);
    }
}