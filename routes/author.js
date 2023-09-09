import express  from 'express';
import { createAuthor, getAllAuthor, getAuthor, updateAuthor, sort, search } from '../controllers/author.js';
import { verifyAdminLogin } from '../middleware/verifyAdmin.js';
import { authorValidate } from '../middleware/schemaValidator.js';
import { ROLES } from '../utillis/ROLE.js';
import checkUserRole from '../middleware/checkUserRole.js'
const route = express.Router();

route.post('/addAuthor', verifyAdminLogin,authorValidate,createAuthor)
route.get('/getAllAuthor', verifyAdminLogin,getAllAuthor)
// route.get('/getAuthor', verifyAdminLogin,getAuthor)
route.get('/getAuthor', checkUserRole(ROLES.Admin),getAuthor)
// update author
route.put('/updateAuthor/:id', verifyAdminLogin, authorValidate,updateAuthor);

// sort author
route.get('/sort', checkUserRole(ROLES.Admin), sort)
// search author
route.get('/search', verifyAdminLogin, search)

export default route;