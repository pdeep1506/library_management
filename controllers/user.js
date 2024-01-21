
import { validateEmail } from "../middleware/schemaValidator.js";
import userModel from "../models/user.js"

import { hashPassword } from "../utillis/hashPassword.js";
import { ROLES } from "../utillis/ROLE.js";

// all user data
export const getAllUsers = async(req,res,next)=>{
    const skip = req.query.skip || 0;
    const limit = req.query.limit || 5;
    
    const allUsers = await userModel.find({}).skip(skip).limit(limit);
   
    for(let i = 0; i < allUsers.length;i++){
        allUsers[i].password = undefined;        
    }

    return res.status(200).json({error: false, data:{success:true,data: allUsers}});
}

//  get  all user data who are admin.
export const getAllAdmin = async(req,res,next)=>{
    const skip = req.query.skip || 0;
    const limit = req.query.limit || 5;
    const allUsers = await userModel.find({role: ROLES.Admin}).skip(skip).limit(limit);
   
    // for(let i = 0; i < allUsers.length;i++){
    //     allUsers[i].password = undefined;        
    // }

    return res.status(200).json({error: false, data:{success:true,data: allUsers}});
}

//  get all user data who are not admin.
export const getAllNotAdmin = async(req,res,next)=>{
    const skip = req.query.skip || 0;
    const limit = req.query.limit || 5;
    const role = req.body.role

    const allUsers = await userModel.find({role: role.toUpperCase()}).skip(skip).limit(limit);
   
    for(let i = 0; i < allUsers.length;i++){
        allUsers[i].password = undefined;        
    }

    return res.status(200).json({error: false, data:{success:true, data: allUsers}});
}

//  get detail of particular user
export const getUser = async(req,res,next)=>{
    const email = req.body.email;
    if(!email){
        return res.status(200).json({error:false, data:{success: false, message:"Email did not found."}})
    }
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

export const updateUser = async(req,res,next)=>{
    const id = req.params.id;
    const findUser = await userModel.find({_id:id});
    
    if(findUser.length <=0){
        return res.status(400).json({error: false, data:{success:false,message:"User not found"}});
    }
    else{
        const userChangeEmail = await userModel.find({email: req.body.email});
        const userChangeCNumber = await userModel.find({cNumber: req.body.cNumber});
        
        // email is already associated with the other user (means new email is already in database )

        if(userChangeEmail.length>0 && (findUser.email != req.body.email)){
            return res.status(400).json({error:false, data:{success:false, message: "New email is already in database"}})
        }
        else if(userChangeCNumber.length>0 && (findUser.cNumber != req.body.cNumber)){
              // cNumber is already associated with the other user (means new cNumber is already in database )
            return res.status(400).json({error:false, data:{success:false, message: "New contact number is already in database"}})
        }
        else if(req.currentUser._id == req.body.id){

                let email = req.body.email;
                email = email ? email.trim().toLowerCase() : null
                // let password = req.body.password;
                let fName = req.body.fName;
                let lName = req.body.lName;
                let cNumber = req.body.cNumber;
                // const passwordHASH = hashPassword(password);
                
                const user = {
                fName: fName, lName: lName, cNumber: cNumber, email: email, 
                // password: passwordHASH
                }

                const updateUser = await userModel.findOneAndUpdate({_id: id},user);
                if(updateUser){
                    //  user updated successfully.
                    return res.status(200).json({ error: false, data: { success: true, message: "Successfully updated user." } });
                }
                else{
                    // user did not updated successfully.
                    return res.status(400).json({ error: false, data: { success: false, message: "Error while updating account." } });
                }
        }
        else{
            return res.status(409).json({ error: false, data: { success: false, message: "Error while updating account." } });
        }
    }
}

// sort authort
export const sortUser = async(req,res)=>{
    userModel.find({}).sort(req.query.sort)
    .then((respo)=>{

        return res.status(200).json({error:false, data:{ success: true, messsage: "Get all user by sorting", date: respo}})
    })
    .catch((err)=>{
        return res.status(404).json({error:false, data:{ success: false, messsage: err}})

    })
  
}

// search  user

export const searchUser = async(req,res,next)=>{
    let query = {}
    const {email}  = req.query
    if(email){

        query.email = {$regex: email, $options:"i"};
    }
    
    // console.log(query)
    const findUser = await userModel.find(query);
    // console.log(query)
    if(findUser.length > 0){
        return res.status(200).json({error:false, data:{success: true, data:findUser}})
    }
    else{
        return res.status(500).json({error:false, data:{success:false, message:"Not a Valid Search"}})
    }
}