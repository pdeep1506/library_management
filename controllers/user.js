import userModel from "../models/user.js"
export const allUsers = async(req,res,next)=>{
    const allUsers = await userModel.find({});
    return res.json({error: false, data:{success:true, allUsers}});
}