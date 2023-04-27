import { userSchemaValidator, authorSchemaValidator, adminSchemaValidator } from "../utillis/SchemaValidator.js";


export const userValidate = (req, res, next) => {
    
   
    const { error } = userSchemaValidator.validate(req.body);
    // More logic goes here

    if(error){
        return res.status(400).json({error: false, data:{success: false, data: "Invalid data."}})
    }
    else{
        next();
    }
  }


  export const authorValidate = (req, res, next) => {
    
   
    const { error } = authorSchemaValidator.validate(req.body);
    // More logic goes here

    if(error){
        return res.status(400).json({error: false, data:{success: false, data: "Invalid data."}})
    }
    else{
        next();
    }
  }

  export const adminValidate = (req, res, next) => {
    
    
    const { error } = adminSchemaValidator.validate(req.body);
    // More logic goes here

    if(error){
        return res.status(400).json({error: false, data:{success: false, data: "Invalid data."}})
    }
    else{
        next();
    }
  }