// import express from "express";
import jsonwebtoken from 'jsonwebtoken'
import userModel from '../models/user.js';
import { hashPassword, decryptPassword,  } from '../utillis/hashPassword.js';
import { userSchemaValidator,adminSchemaValidator } from "../utillis/SchemaValidator.js";


export const register = async(req,res,next)=>{
    // const password = hashPassword('imdeep');
    // const decrypt =  decryptPassword(password);
    // console.log("password :-  ", password)
    // console.log("decr :-", decrypt);
    

    let email = req.body.email;
    email = email ? email.trim().toLowerCase() : null
    let password = req.body.password;
    let fName = req.body.fName;
    let lName = req.body.lName;
    let cNumber = req.body.cNumber;
    // let admin = req.body.admin ? true: false;

    
    
    try{
        if(!userSchemaValidator.validateAsync(req.body)){
           
            return res.json({error: false, data:{success: false, data: "Invalid Data."}})
        }
        //  checking all data is correct
        // if( !email || !password || !fName || !lName || !cNumber){
        //     return res.json({error: false, data:{ success: false, data: "missing data"}});

        // }
        // if(password.trim().length < 6){
        //     return res.json({error: false, data: { success: false, data: "password length should be minimum 6" }})
        // }
        // if(!String(password).match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/)) {
        //     return res.json({error: false, data:{ success: false, data: "Password did not include everything."}})
        //  }
    
   
        // if(cNumber.toString().length != 10){
        //     return res.json({error:false, data:{ success: false, data:"phone number length should be 10"}})
        // }
        // if (!String(email).match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
        //     return res.json({ error: false, data: { success: false, message: "Invalid Email." } });
        // }
        //  check email or contact number is already in database
        const checkEmail = await userModel.findOne({email: email});
        const checkcNumber = await userModel.findOne({cNumber: cNumber});
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
        else{
            //  code for registration
            const passwordHASH = hashPassword(password);
            const user = {
                fName: fName, lName: lName, cNumber: cNumber, email: email, password: passwordHASH
            }

            const saveUser = await userModel.create(user);
            if(saveUser){
                //  user created successfully.
                return res.json({ error: false, data: { success: true, message: "Successfully created user." } });
            }
            else{
                // user did not created successfully.
                return res.json({ error: false, data: { success: false, message: "Error while creating account." } });
            }
        }

    }
    catch(err){
        next(err);
    }
    
}


export const login = async(req,res,next)=>{
    const email = req.body.email;
    const password = req.body.password;
    
    let query = { email: email};
    // if(isNaN(Number(emailORcontact))){
    //     query = {cNumber : emailORcontact};
    // }
    const exitingUser = await userModel.findOne(query);

    try{
        
        if(!exitingUser){
              //  email or contact number not found in database
              return res.json({error: false, data:{ success: false, message: "Email or contact number not found"}});

           
        }
        else{
           // code here to login
           const decrypt =  decryptPassword(exitingUser.password);
         
           if(decrypt == password ){
              //  login success
              // jwt
              const jwt = jsonwebtoken.sign({
                exp: Math.floor(Date.now() / 1000) + (60 * 60),
                user: exitingUser
            }, process.env.JWT_KEY)
            res.cookie('jwt', jwt)
            return res.json({ error: false, data: { success: true, message: "login successfully", jwt: jwt } })

           }
           else{
              //  password did not match
              return res.json({error: false, data:{ success: false, message: "Wrong credentials"}})
           }
        }
    }
    catch(error){
        next(error);
    }
}

export const Adminregister = async(req,res,next)=>{
    
    

    let email = req.body.email;
    email = email ? email.trim().toLowerCase() : null
    let password = req.body.password;
    let fName = req.body.fName;
    let lName = req.body.lName;
    let cNumber = req.body.cNumber;
    let admin = req.body.admin;

    
    
    try{
        if(!adminSchemaValidator.validateAsync(req.body)){
           
            return res.json({error: false, data:{success: false, data: "Invalid Data."}})
        }
      
        //  check email or contact number is already in database
        const checkEmail = await userModel.findOne({email: email});
        const checkcNumber = await userModel.findOne({cNumber: cNumber});
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
        else{
            //  code for registration
            const passwordHASH = hashPassword(password);
            const user = {
                fName: fName, lName: lName, cNumber: cNumber, email: email, password: passwordHASH, admin: admin
            }

            const saveUser = await userModel.create(user);
            if(saveUser){
                //  user created successfully.
                return res.json({ error: false, data: { success: true, message: "Successfully created user." } });
            }
            else{
                // user did not created successfully.
                return res.json({ error: false, data: { success: false, message: "Error while creating account." } });
            }
        }

    }
    catch(err){
        next(err);
    }
    
}
