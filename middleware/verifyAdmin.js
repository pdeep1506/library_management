import jsonwebtoken from "jsonwebtoken";

export const verifyAdminLogin = async(req,res,next)=>{
    const jwt = req.cookies['jwt'];
    // let decodedToken;
    try{
        
        
        if(jwt){
            jsonwebtoken.verify(jwt, process.env.JWT_KEY, function(err, decoded) {
               
                if(decoded){
                    
                    if(decoded.user.admin == true){
                        next();
                    }
                    else{
                        return res.status(401).json({error:false, data: {success:false,message: "You are not authorized."}})
                    }
                }
                else{
                    return res.status(401).json({error:false, data: {success:false,message: "You are not authorized."}})
                }
              });
        }
        else{
            return res.status(401).son({error:false, data: {success:false,message: "You are not login.Please login to continue"}})
        }
      
        
    }
    catch(err){
        next(err);
    }
}