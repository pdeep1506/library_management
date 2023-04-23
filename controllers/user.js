import userModel from "../models/user.js"



// all user data
export const allUsers = async(req,res,next)=>{
    const allUsers = await userModel.find({});
   
    for(let i = 0; i < allUsers.length;i++){
        allUsers[i].password = undefined;        
    }

    return res.json({error: false, data:{success:true, allUsers}});
}

//  get  all user data who are admin.
export const allAdmin = async(req,res,next)=>{
    const allUsers = await userModel.find({admin:true});
   
    for(let i = 0; i < allUsers.length;i++){
        allUsers[i].password = undefined;        
    }

    return res.json({error: false, data:{success:true, allUsers}});
}

//  get all user data who are not admin.
export const allNotAdmin = async(req,res,next)=>{
    const allUsers = await userModel.find({admin: false});
   
    for(let i = 0; i < allUsers.length;i++){
        allUsers[i].password = undefined;        
    }

    return res.json({error: false, data:{success:true, allUsers}});
}