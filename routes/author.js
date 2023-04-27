import express  from 'express';
import { createAuthor, getAllAuthor, getAuthor } from '../controllers/author.js';
import { verifyAdminLogin } from '../middleware/verifyAdmin.js';
import { authorValidate } from '../middleware/schemaValidator.js';
const route = express.Router();

route.post('/addAuthor', verifyAdminLogin,authorValidate,createAuthor)
route.get('/getAllAuthor', verifyAdminLogin,getAllAuthor)
route.get('/getAuthor', verifyAdminLogin,getAuthor)

export default route;