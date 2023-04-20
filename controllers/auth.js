import express from "express";
import jsonwebtoken from 'jsonwebtoken'
import userModel from '../models/user.js';
import { hashPassword, decryptPassword } from '../utillis/hashPassword.js';
// const router = express.router();

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
    let admin = req.body.admin ? true: false;

    // var passw = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;
    // if(inputtxt.value.match(passw)) 
    // { 
    // alert('Correct, try another...')
    // return true;
    // }
    try{
        //  checking all data is correct
        if( !email || !password || !fName || !lName || !cNumber){
            return res.json({error: false, data:{ success: false, data: "missing data"}});

        }
        if(password.trim().length < 6){
            return res.json({error: false, data: { success: false, data: "password length should be minimum 6" }})
        }
        if(cNumber.toString().length != 10){
            return res.json({error:false, data:{ success: false, data:"phone number length should be 10"}})
        }
        if (!String(email).match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
            return res.json({ error: false, data: { success: false, message: "Invalid Email." } });
        }
        //  check email or contact number is already in database
        const checkEmail = await userModel.findOne({email: email});
        const checkcNumber = await userModel.findOne({cNumber: cNumber});
        if(!checkEmail || !checkcNumber){
            //  code for registration
        }
        else{
            if(checkEmail){
                //  email is already in database
                return res.json({error: false, data:{ success: false, message: "email is already in database"}})
            }
            else{
                //  contact number is already in database
                return res.json({error:false, data:{ success: false, message: "contact number is already in database"}})
            }
        }

    }
    catch(err){
        next(err);
    }
    
}


export const login = async(req,res,next)=>{
    const emailORcontact = req.body.emailORcontact;
    const password = req.body.password;
    
    let query = { email: emailORcontact};
    if(isNaN(Number(emailORcontact))){
        query = {cNumber : emailORcontact};
    }
    const exitingUser = await userModel.findOne(query);
    try{
        if(exitingUser){
            // code here to login
             const decrypt =  decryptPassword(exitingUser.password);
             if(decrypt == password){
                //  login success
                // jwt
             }
             else{
                //  password did not match
                return res.json({error: false, data:{ success: false, message: "password did not match"}})
             }
        }
        else{
            //  email or contact number not found in database
            return res.json({error: false, data:{ success: false, message: "Email or contact number not found"}});
        }
    }
    catch(error){
        next(error);
    }
}