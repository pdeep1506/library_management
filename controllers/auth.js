import express from "express";
import { hashPassword, decryptPassword } from '../utillis/hashPassword.js';
// const router = express.router();

export const register = async(req,res,next)=>{
    const password = hashPassword('imdeep');
    const decrypt =  decryptPassword(password);
    console.log("password :-  ", password)
    console.log("decr :-", decrypt);
    return res.json({error:false, data:{ success: true, message:" API Created", password: password}});
    
}

