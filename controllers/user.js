import { validateEmail } from "../middleware/schemaValidator.js";
import userModel from "../models/user.js"



// all user data
export const allUsers = async(req,res,next)=>{
    const skip = req.query.skip || 0;
    const limit = req.query.limit || 5;
    // console.log(skip);
    // console.log(limit);
    const allUsers = await userModel.find({}).skip(skip).limit(limit);
   
    for(let i = 0; i < allUsers.length;i++){
        allUsers[i].password = undefined;        
    }

    return res.status(200).json({error: false, data:{success:true,data: allUsers}});
}

//  get  all user data who are admin.
export const allAdmin = async(req,res,next)=>{
    const skip = req.query.skip || 0;
    const limit = req.query.limit || 5;
    const allUsers = await userModel.find({admin:true}).skip(skip).limit(limit);
   
    for(let i = 0; i < allUsers.length;i++){
        allUsers[i].password = undefined;        
    }

    return res.status(200).json({error: false, data:{success:true,data: allUsers}});
}

//  get all user data who are not admin.
export const allNotAdmin = async(req,res,next)=>{
    const skip = req.query.skip || 0;
    const limit = req.query.limit || 5;
    const allUsers = await userModel.find({admin: false}).skip(skip).limit(limit);
   
    for(let i = 0; i < allUsers.length;i++){
        allUsers[i].password = undefined;        
    }

    return res.status(200).json({error: false, data:{success:true, data: allUsers}});
}

//  get detail of particular user
export const getUser = async(req,res,next)=>{
    const email = req.body.email;
    const emailIsInValid = validateEmail(email);
    // console.log(emailIsInValid)
    try{
        if(emailIsInValid){
            // email invalid
             return res.status(400).json({error: false, data:{success:false,data:"Invalid email"}});
        }
        else{
        const userFind = await userModel.find({email: email});
        if(userFind.length >0){
            userFind[0].password = undefined;
            return res.status(200).json({error: false, data:{success: true, data: userFind}})
        }
        else{
            return res.status(409).json({error: false, data:{success: false, message: "User not found"}})
        }
        }
    }
    catch(err){
        next(err);
    }

}