import express from "express";

const router = express.Router();

import indexRoute from './index.js';

// different version  
// route
router.use('/v1', indexRoute);



export default router;