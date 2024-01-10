import { userSchemaValidator, authorSchemaValidator, adminSchemaValidator, publicationSchemaValidator, bookSchemaValidator,checkEmail, checkRole } from "../utillis/SchemaDefine.js";


export const userValidate = (req, res, next) => {
    
   
    const { error } = userSchemaValidator.validate(req.body);
    // More logic goes here

    if(error){
        return res.status(400).json({error: false, data:{success: false, data: "Invalid data.", error: error}})
    }
    else{
        next();
    }
  }




  export const authorValidate = (req, res, next) => {
    
   
    const { error } = authorSchemaValidator.validate(req.body);
    // More logic goes here

    if(error){
        return res.status(400).json({error: false, data:{success: false, data: "Invalid data.", error: error}})
    }
    else{
        next();
    }
  }

  export const adminValidate = (req, res, next) => {
    
    
    const { error } = adminSchemaValidator.validate(req.body);
    // More logic goes here

    if(error){
        return res.status(400).json({error: false, data:{success: false, data: "Invalid data.", error: error}})
    }
    else{
        next();
    }
  }

export const publicationValidate = (req,res,next)=>{
    const { error} = publicationSchemaValidator.validate(req.body);
    if(error){
        return res.status(400).json({error: false, data:{success: false, data: "Invalid data.", error: error}})
    }
    else{
        next();
    }
}

export const bookValidate = (req,res,next)=>{
    const { error} = bookSchemaValidator.validate(req.body);
    if(error){
        return res.status(400).json({error: false, data:{success: false, data: "Invalid data.", error: error}})
    }
    else{
        next();
    }
}

export const validateRole = (req,res,next)=>{


    const { error } = checkRole.validate(req.body);
    if(error){
        return res.status(400).json({error: false, data:{success: false, data: "Invalid data.", error: error}})
    }
    else{
        next();
        // console.log("I am here  ", error)
    }
}

export const validateEmail =(email)=>{
    // console.log(email);
    const {error} = checkEmail.validate({email:email});
    // console.log(error)
    if(error){
        return true;
    }
    else{
        return false;
    }

}


