import express from "express";

const router = express.Router();

import indexRoute from './index.js';
router.use('/v1', indexRoute);



export default router;