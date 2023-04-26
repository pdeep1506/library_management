import userModel from "../models/user.js"



// all user data
export const allUsers = async(req,res,next)=>{
    const allUsers = await userModel.find({});
   
    for(let i = 0; i < allUsers.length;i++){
        allUsers[i].password = undefined;        
    }

    return res.status(200).json({error: false, data:{success:true,data: allUsers}});
}

//  get  all user data who are admin.
export const allAdmin = async(req,res,next)=>{
    const allUsers = await userModel.find({admin:true});
   
    for(let i = 0; i < allUsers.length;i++){
        allUsers[i].password = undefined;        
    }

    return res.json({error: false, data:{success:true,data: allUsers}});
}

//  get all user data who are not admin.
export const allNotAdmin = async(req,res,next)=>{
    const allUsers = await userModel.find({admin: false});
   
    for(let i = 0; i < allUsers.length;i++){
        allUsers[i].password = undefined;        
    }

    return res.json({error: false, data:{success:true, data: allUsers}});
}

//  get detail of particular user
export const getUser = async(req,res,next)=>{
    const email = req.body.email;
    if(email){
        const userFind = await userModel.find({email: email});
        if(userFind.length >0){
            userFind[0].password = undefined;
            return res.json({error: false, data:{success: true, user: userFind}})
        }
        else{
            return res.json({error: false, data:{success: false, message: "User not found"}})
        }
    }
    else{
        return res.json({error: false, data:{ success: false, message: "Email did not receive"}})
    }
}