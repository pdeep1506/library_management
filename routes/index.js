import express from "express";

const router = express.Router();
import authRoute from './auth.js';


//  all route 
router.use("/auth", authRoute);


export default router;