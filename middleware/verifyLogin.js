import jsonwebtoken from "jsonwebtoken";

const verifyLogin = async(req,res,next)=>{
    const jwt = req.cookies['jwt'];
    let decodedToken;
    try{
        if(!jwt){
            jsonwebtoken.verify(jwt, process.env.JWT_KEY, (err,user)=>{
                if(err){
                    console.log("error in middleware   ", err);
                    next(err);
                }
                else{
                    console.log(" decoded token " + jwt);
                    try{
                        if(jwt){
                            req.user = jwt;
                            next();
                        }
                        else{
                            
                            return res.json({error: true, data:{ success: false, message: "please login again"}})
                        }
                    }
                    catch(err){
                        next(err);
                    }

                    
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