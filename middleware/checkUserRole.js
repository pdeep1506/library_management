// import { ROLES } from "../utillis/ROLE.js";
import jsonwebtoken from "jsonwebtoken";
function checkUserRole(requiredRole){
    return(req,res,next)=>{
        const jwt = req.cookies['jwt'];
        try{
        
        
            if(jwt){
                jsonwebtoken.verify(jwt, process.env.JWT_KEY, function(err, decoded) {
                   
                    if(decoded){
                        
                        if(decoded.user.role == requiredRole){
                            req.currentUser = decoded.user
                            // console.log(decoded)
                            next();
                        }
                        else{
                            return res.json({error:false, data: {success:false,message: "You are not authorized."}})
                        }
                    }
                    else{
                        return res.json({error:false, data: {success:false,message: "You are not authorized."}})
                    }
                  });
            }
            else{
                return res.status(401).json({error:false, data: {success:false,message: "You are not login.Please login to continue"}})
            }
          
            
        }
        catch(err){
            next(err);
        }
    }
}

export default checkUserRole;