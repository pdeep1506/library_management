import publicationModel from "../models/publication.js"
import userModel from "../models/user.js";
import { foundNationality } from "../utillis/country.js";
import { validateEmail } from "../middleware/schemaValidator.js";
import { ROLES } from "../utillis/ROLE.js";
export const addPublication = async(req,res,next)=>{
    

    const name = req.body.name;
    const email = req.body.email;
    const cNumber= req.body.cNumber;
    const nationality = req.body.nationality.toLowerCase();
    const creator = req.currentUser._id;
    // console.log("creator  ",  creator)
    // checking if email is already in publication table

    const checkEmail = await userModel.findOne({email: email});
    const checkcNumber = await publicationModel.findOne({cNumber: cNumber});
    try{
        //  email is already in database or cNumber is already in database.
        if(checkEmail || checkcNumber){
            // email is aleady in database.
            if(checkEmail && checkcNumber){
                return res.status(409).json({error: false, data:{ success: false, message: "email and contact number is already in publication database"}})
            }
            else if(checkEmail){

                return res.status(409).json({error: false, data:{ success: false, message: "email is already in publication database"}})
            }
            // cNumber is already in datababase.
            else if(checkcNumber){
                return res.status(409).json({error: false, data:{ success: false, message: "cNumber is already in publication database"}})
            }
        }
        // email or cNumber is not in databse
        else{
            // checkig that nationality is valid or not
            if(foundNationality(nationality)== false){
                return res.status(409).json({success: false, data: {message: "Invalid country name"}})
            }
            else{
                const savePublication = await publicationModel.create({name:name, email: email, cNumber: cNumber, nationality:nationality, role: ROLES.Publication,creator:creator });
                return  res.status(201).json({error:false, data:{success: true, message:"publication successfully created", data:savePublication}});
            }

        }
    }
    catch(err){
        next(err);
    }
 
}

export const getAllPublication = async(req,res,next)=>{
    const skip = req.query.skip || 0;
    const limit = req.query.limit || 5;
   
    const allPublication = await publicationModel.find().skip(skip).limit(limit);
    return res.status(200).json({error: false, data:{success:true, data: allPublication}});
}


export const getPublication = async(req,res,next)=>{
  
    const email = req.body.email;
    const emailIsInValid = validateEmail(email);
    try{
        if(emailIsInValid){
            // email invalid
            return res.status(400).json({error: false, data:{success:false,data:"Invalid email"}});
        }
        else{
            // email is valid
            // check email in publication model
            const findPublication = await publicationModel.find({email: email });
            if(findPublication.length>0){
                return res.status(200).json({error: false, data:{success: true, data: findPublication}})
            }
            else{
                return res.json({error: false, data:{success: false, message: "publication not found"}})
            }

        }

    } 
    catch(err){
        next(err);
    }

   
}

export const updatePublication = async(req,res,next)=>{
    
    const id = req.params.id;
    const creator = req.currentUser._id;
    // console.log("creater id  ", creator)
    const findPublication = await publicationModel.find({_id:id});
    // console.log(findPublication[0].creator)
    if(findPublication.length<=0){
        return res.status(400).json({error: false, data:{success:false,message:"publication not found"}});
    }
    else if(findPublication[0].creator.toString() !== creator){

        return res.status(400).json({error: false, data:{success:false,message:"You are not authorized."}});
    }
    else{
        const publicationChangeEmail = await publicationModel.find({email: req.body.email});
        const publicationChangeCNumber = await publicationModel.find({cNumber: req.body.cNumber});
        //! email is already associated with the other publication (means new email is already in database )

        if(publicationChangeEmail.length>0 && (findPublication[0].email != req.body.email)){
            return res.status(400).json({error:false, data:{success:false, message: "New email is already in database"}})
        } else if(publicationChangeCNumber.length>0 && (findPublication[0].cNumber != req.body.cNumber)){
            //! cNumber is already associated with the other user (means new cNumber is already in database )
          return res.status(400).json({error:false, data:{success:false, message: "New contact number is already in database"}})
      }
       
        else if(foundNationality(req.body.nationality)== false){
            return res.status(400).json({success: false, data: {message: "Invalid country name"}})
        }
        else{

                let email = req.body.email;
                email = email ? email.trim().toLowerCase() : null
               
                let name = req.body.name;
               
                let cNumber = req.body.cNumber;
                let nationality = req.body.nationality.toLowerCase();
                
                const publication = {
                name: name,  cNumber: cNumber, email: email, nationality: nationality
                }

                const updatePublication = await publicationModel.findOneAndUpdate({_id: id},publication);
                if(updatePublication){
                    //  user updated successfully.
                    return res.status(200).json({ error: false, data: { success: true, message: "Successfully updated Publication data." } });
                }
                else{
                    // user did not updated successfully.
                    return res.status(409).json({ error: false, data: { success: false, message: "Error while updating author information." } });
                }
        }
        
    }
}



// sort authort
export const sortPublication = async(req,res)=>{
    publicationModel.find({}).sort(req.query.sort)
    .then((respo)=>{

        return res.status(200).json({error:false, data:{ success: true, messsage: "Get all publication by sorting", date: respo}})
    })
    .catch((err)=>{
        return res.status(404).json({error:false, data:{ success: false, messsage: err}})

    })
  
}

export const searchPublication = async(req,res)=>{
    let query = {};
    const { email} = req.body;
    if(email){
        
        query.email = {$regex: email, $options:"i"};
    }
    // if(cNumber){
       
    //     query.cNumber = {$regex: cNumber, $options:"i"};
    // }
    // console.log(query)
    const searchPublication = await publicationModel.find(query);
    if(searchPublication.length > 0){
        return res.status(200).json({error:false, data:{success:true, date:searchPublication}})
    }
    else{
        return res.status(500).json({error:false, data:{success:false, message:"Not a Valid Search"}})
    }
}