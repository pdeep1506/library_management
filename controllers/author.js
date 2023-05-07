import authorModel from "../models/author.js";
import {  foundNationality } from "../utillis/country.js";


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
   

    try{
       
        if(foundNationality(nationality)== false){
            return res.status(409).json({success: false, data: {message: "Invalid country name"}})
        }
       else if(checkEmail || checkcNumber){
         
            if(checkEmail){
                //  email is already in database
                return res.status(409).json({error: false, data:{ success: false, message: "email is already in database"}})
            }
            else if(checkcNumber){
                //  contact number is already in database
                return res.status(409).json({error:false, data:{ success: false, message: "contact number is already in database"}})
            }
          }


        else{
            
            const saveAuthor = await authorModel.create({email: email, fName: fName, lName: lName, cNumber: cNumber, nationality: nationality});
            if(saveAuthor){

                return res.status(201).json({error: false, data:{ success: true, data: saveAuthor}});
            }
            else{
                return res.status(422).json({error: false, data:{success: false, message: "Error while inserting data into  author."}})
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
        return res.status(200).json({error: false, data:{success:true, data: getAllAuthor}});
    }
    else{
        return res.status(200).json({error:false, data:{success:false, message: "There is no data abouth author."}});
    }
}

export const getAuthor = async(req,res,next)=>{
    const email = req.body.email;
    if(email){
        const findAuthor = await authorModel.find({email: email});
        // console.log("find author  ", findAuthor.length);
        if(findAuthor.length > 0){
            return res.status(200).json({error: false, data:{success:true, data: findAuthor}})
        }
        else{
            return res.status(200).json({error: false, data:{success: false, message:`Did not found author data for ${email}`}});
        }
    }
    else{
        return res.status(200).json({error:false, data:{success: false, message:"Email did not found."}})
    }
}

export const updateAuthor = async(req,res,next)=>{
    const id = req.params.id;
    const findAuthor = await authorModel.find({_id:id});
    // console.log("change user", req.user);
    if(findAuthor.length<=0){
        return res.status(400).json({error: false, data:{success:false,message:"Author not found"}});
    }
    else{
        const authorChangeEmail = await authorModel.find({email: req.body.email});
        const authorChangeCNumber = await authorModel.find({cNumber: req.body.cNumber});
        
        // email is already associated with the other user (means new email is already in database )

        if(authorChangeEmail.length>0 && (findAuthor.email != req.body.email)){
            return res.status(400).json({error:false, data:{success:false, message: "New email is already in database"}})
        }
        else if(authorChangeCNumber.length>0 && (findAuthor.cNumber != req.body.cNumber)){
              // cNumber is already associated with the other user (means new cNumber is already in database )
            return res.status(400).json({error:false, data:{success:false, message: "New contact number is already in database"}})
        }
        else if(foundNationality(req.body.nationality)== false){
            return res.status(400).json({success: false, data: {message: "Invalid country name"}})
        }
        else{

                let email = req.body.email;
                email = email ? email.trim().toLowerCase() : null
               
                let fName = req.body.fName;
                let lName = req.body.lName;
                let cNumber = req.body.cNumber;
                let nationality = req.body.nationality.toLowerCase();
                
                const author = {
                fName: fName, lName: lName, cNumber: cNumber, email: email, nationality: nationality
                }

                const updateAuthor = await authorModel.findOneAndUpdate({_id: id},author);
                if(updateAuthor){
                    //  user updated successfully.
                    return res.status(200).json({ error: false, data: { success: true, message: "Successfully updated author." } });
                }
                else{
                    // user did not updated successfully.
                    return res.status(409).json({ error: false, data: { success: false, message: "Error while updating author information." } });
                }
        }
        
    }
}