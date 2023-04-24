import authorModel from "../models/author.js";
import {  foundNationality } from "../utillis/country.js";
import { authorSchemaValidator } from "../utillis/SchemaValidator.js";

export const createAuthor = async(req,res,next)=>{
    // console.log(req.body)
    let email = req.body.email;
    email = email ? email.trim().toLowerCase() : null
    
    let fName = req.body.fName;
    let lName = req.body.lName;
    let cNumber = req.body.cNumber;
    let nationality = req.body.nationality.toLowerCase();
    
      //  check email or contact number is already in database
      const checkEmail = await authorModel.findOne({email: email});
      const checkcNumber = await authorModel.findOne({cNumber: cNumber});
      if(checkEmail || checkcNumber){
         
          if(checkEmail){
              //  email is already in database
              return res.json({error: false, data:{ success: false, message: "email is already in database"}})
          }
          else if(checkcNumber){
              //  contact number is already in database
              return res.json({error:false, data:{ success: false, message: "contact number is already in database"}})
          }
        }

    try{
        if(!authorSchemaValidator.validateAsync(req.body)){
            return res.json({success: false, data:{ message: "Invalid data"}})
        }
        else if(foundNationality(nationality)== false){
            return res.json({success: false, data: {message: "Invalid country name"}})
        }
       else if(checkEmail || checkcNumber){
         
            if(checkEmail){
                //  email is already in database
                return res.json({error: false, data:{ success: false, message: "email is already in database"}})
            }
            else if(checkcNumber){
                //  contact number is already in database
                return res.json({error:false, data:{ success: false, message: "contact number is already in database"}})
            }
          }


        else{
            
            const saveAuthor = await authorModel.create({email: email, fName: fName, lName: lName, cNumber: cNumber, nationality: nationality});
            if(saveAuthor){

                return res.json({error: false, data:{ success: true, data: saveAuthor}});
            }
            else{
                return res.json({error: false, data:{success: false, message: "Error while inserting data into  author."}})
            }
        }
    }
    catch(err){
        next(err);
    }

}

export const getAllAuthor = async(req,res,next)=>{
    const getAllAuthor = await authorModel.find({});
    if(getAllAuthor){
        return res.json({error: false, data:{success:true, data: getAllAuthor}});
    }
    else{
        return res.json({error:false, data:{success:false, message: "There is no data abouth author."}});
    }
}

export const getAuthor = async(req,res,next)=>{
    const email = req.body.email;
    if(email){
        const findAuthor = await authorModel.find({email: email});
        console.log("find author  ", findAuthor.length);
        if(findAuthor.length > 0){
            return res.json({error: false, data:{success:true, data: findAuthor}})
        }
        else{
            return res.json({error: false, data:{success: false, message:`Did not found author data for ${email}`}});
        }
    }
    else{
        return res.json({error:false, data:{success: false, message:"Email did not found."}})
    }
}

