// import express from "express";import jsonwebtoken from 'jsonwebtoken'
import userModel from '../models/user.js';
import { hashPassword, decryptPassword } from '../utillis/hashPassword.js';
import  nodemailer from "nodemailer";

const htmlRegistration = `
        <h1>Hello </h1>
        <p> Welcome to the library management </p>
`;


export const register = async(req,res,next)=>{
    
    

    let email = req.body.email;
    email = email ? email.trim().toLowerCase() : null
    let password = req.body.password;
    let fName = req.body.fName;
    let lName = req.body.lName;
    let cNumber = req.body.cNumber;
  


    try{
       
        
       
        //  check email or contact number is already in database
        const checkEmail = await userModel.findOne({email: email});
        const checkcNumber = await userModel.findOne({cNumber: cNumber});
        if(checkEmail || checkcNumber){
           
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
            //  code for registration
            const passwordHASH = hashPassword(password);
            const user = {
                fName: fName, lName: lName, cNumber: cNumber, email: email, password: passwordHASH
            }

            const saveUser = await userModel.create(user);
      
            if(saveUser){
                //  user created successfully.
              let testAccount = await nodemailer.createTestAccount();
              console.log(testAccount);
              let transporter =  nodemailer.createTransport({
                    host: "smtp.ethereal.email",
                    port: 587,
                    secure: false, // true for 465, false for other ports
                    auth: {
                      user: testAccount.user, // generated ethereal user
                      pass: testAccount.pass, // generated ethereal password
                    },
                });
                // send mail with defined transport object
             let info = await transporter.sendMail({
          from: '"Fred Foo 👻" <foo@example.com>', // sender address
          to: saveUser.email, // list of receivers
                subject: "Welcome to library ✔", // Subject line
              text: "Hello world?", // plain text body
             html: htmlRegistration, // html body
             });
             console.log("Message sent: %s", info.messageId);
                return res.status(201).json({ error: false, data: { success: true, message: "Successfully created user." } });
            }
            else{
                // user did not created successfully.
                return res.status(409).json({ error: false, data: { success: false, message: "Error while creating account." } });
            }
        }

    }
    catch(err){
        next(err);
        // return res.json(err)
    }
    
}


export const login = async(req,res,next)=>{
    const email = req.body.email;
    const password = req.body.password;
    
    let query = { email: email};
   
    const exitingUser = await userModel.findOne(query);

    try{
        
        if(!exitingUser){
              //  email or contact number not found in database
              return res.status(401).json({error: false, data:{ success: false, message: "Email or contact number not found"}});

           
        }
        else{
           // code here to login
           const decrypt =  decryptPassword(exitingUser.password);
         
           if(decrypt == password ){
              //  login success
              // creating jwt
              const jwt = jsonwebtoken.sign({
                exp: Math.floor(Date.now() / 1000) + (60 * 60),
                user: exitingUser
            }, process.env.JWT_KEY)
            res.cookie('jwt', jwt)
            return res.status(200).json({ error: false, data: { success: true, message: "login successfully", jwt: jwt } })

           }
           else{
              //  password did not match
              return res.status(401).json({error: false, data:{ success: false, message: "Wrong credentials"}})
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
    
      
        //  check email or contact number is already in database
        const checkEmail = await userModel.findOne({email: email});
        const checkcNumber = await userModel.findOne({cNumber: cNumber});
        if(checkEmail || checkcNumber){
           
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
            //  code for registration
            const passwordHASH = hashPassword(password);
            const user = {
                fName: fName, lName: lName, cNumber: cNumber, email: email, password: passwordHASH, admin: admin
            }

            const saveUser = await userModel.create(user);
            if(saveUser){
                //  user created successfully.
                return res.status(201).json({ error: false, data: { success: true, message: "Successfully created user." } });
            }
            else{
                // user did not created successfully.
                return res.status(409).json({ error: false, data: { success: false, message: "Error while creating account." } });
            }
        }

    }
    catch(err){
        next(err);
    }
    
}
