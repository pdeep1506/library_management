import express from "express";

const router = express.Router();
import authRoute from './auth.js';
import userRoute from './user.js';


//  all route 
router.use("/auth", authRoute);
router.use('/user', userRoute);

export default router;