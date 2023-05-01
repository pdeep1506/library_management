import express from "express";

const router = express.Router();
import authRoute from './auth.js';
import userRoute from './user.js';
import authorRoute from './author.js';
import bookRoute from './book.js';
import publicatationRoute from './publication.js';

//  all route 
router.use("/auth", authRoute);
router.use('/user', userRoute);
router.use('/author', authorRoute);
router.use('/book', bookRoute);
router.use('/publication', publicatationRoute)

export default router;