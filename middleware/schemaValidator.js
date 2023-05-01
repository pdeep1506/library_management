import { userSchemaValidator, authorSchemaValidator, adminSchemaValidator, publicationSchemaValidator, bookSchemaValidator } from "../utillis/SchemaDefine.js";


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