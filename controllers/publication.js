import publicationModel from "../models/publication.js"
import { foundNationality } from "../utillis/country.js";
import { validateEmail } from "../middleware/schemaValidator.js";
export const addPublication = async(req,res,next)=>{
    

    const name = req.body.name;
    const email = req.body.email;
    const cNumber= req.body.cNumber;
    const nationality = req.body.nationality.toLowerCase();
    
    // checking if email is already in publication table

    const checkEmail = await publicationModel.findOne({email: email});
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
                const savePublication = await publicationModel.create({name:name, email: email, cNumber: cNumber, nationality:nationality});
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
   
    const allPublication = await publicationModel.find({}).skip(skip).limit(limit);
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

