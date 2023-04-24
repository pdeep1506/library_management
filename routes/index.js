import express from "express";

const router = express.Router();
import authRoute from './auth.js';
import userRoute from './user.js';
import authorRoute from './author.js';

//  all route 
router.use("/auth", authRoute);
router.use('/user', userRoute);
router.use('/author', authorRoute);

export default router;