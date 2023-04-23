import jsonwebtoken from "jsonwebtoken";

export const verifyLogin = async(req,res,next)=>{
    const jwt = req.cookies['jwt'];
    
    try{
        
        
        if(jwt){
            jsonwebtoken.verify(jwt, process.env.JWT_KEY, function(err, decoded) {
               
                if(decoded){
                 
                    if(decoded.user){
                        next();
                    }
                    else{
                        return res.json({error:false, data: {success:false,message: "You are not login."}})
                    }
                }
                else{
                    return res.json({error:false, data: {success:false,message: "You are not login.Please login to continue"}})
                }
              });
        }
        else{
            return res.json({error:false, data: {success:false,message: "You are not login.Please login to continue"}})
        }
      
        
    }
    catch(err){
        next(err);
    }
}