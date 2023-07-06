import express  from 'express';
import { createAuthor, getAllAuthor, getAuthor, updateAuthor, sort, search } from '../controllers/author.js';
import { verifyAdminLogin } from '../middleware/verifyAdmin.js';
import { authorValidate } from '../middleware/schemaValidator.js';
const route = express.Router();

route.post('/addAuthor', verifyAdminLogin,authorValidate,createAuthor)
route.get('/getAllAuthor', verifyAdminLogin,getAllAuthor)
route.get('/getAuthor', verifyAdminLogin,getAuthor)

// update author
route.put('/updateAuthor/:id', verifyAdminLogin, authorValidate,updateAuthor);

// sort author
route.get('/sort', verifyAdminLogin, sort)
// search author
route.get('/search', verifyAdminLogin, search)

export default route;