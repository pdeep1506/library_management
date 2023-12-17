import express  from 'express';
import { createAuthor, getAllAuthor, getAuthor, updateAuthor, sortAuthor, searchAuthor } from '../controllers/author.js';
import { verifyAdminLogin } from '../middleware/verifyAdmin.js';
import { authorValidate } from '../middleware/schemaValidator.js';
import { ROLES } from '../utillis/ROLE.js';
import checkUserRole from '../middleware/checkUserRole.js'
const route = express.Router();

// route.post('/addAuthor', verifyAdminLogin,authorValidate,createAuthor)
route.get('/getAllAuthor', checkUserRole(ROLES.Admin),getAllAuthor)
// route.get('/getAuthor', verifyAdminLogin,getAuthor)
route.get('/getAuthor', checkUserRole(ROLES.Admin),getAuthor)
// update author
route.put('/updateAuthor/:id', checkUserRole(ROLES.Author), authorValidate,updateAuthor);

// sort author
route.get('/sortAuthor', checkUserRole(ROLES.Admin), sortAuthor)
// search author
route.get('/searchAuthor', checkUserRole(ROLES.Admin), searchAuthor)

export default route;