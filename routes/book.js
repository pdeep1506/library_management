import express from 'express';
import { bookValidate } from '../middleware/schemaValidator.js';
import { verifyAdminLogin} from '../middleware/verifyAdmin.js';
import { verifyLogin } from '../middleware/verifyLogin.js';
import checkUserRole from '../middleware/checkUserRole.js'
import { ROLES } from '../utillis/ROLE.js';
import {addBook, getAllBooks, sortBook, searchBook, getBook, updateBook} from '../controllers/book.js';
const route = express.Router();



route.post('/addBook', checkUserRole(ROLES.Admin), bookValidate, addBook);
route.get('/getAllBooks', checkUserRole(ROLES.Admin), getAllBooks)
route.get('/sortBook', checkUserRole(ROLES.Admin), sortBook)
route.get('/searchBook', checkUserRole(ROLES.User), searchBook);
route.get('/getBook', checkUserRole(ROLES.User), getBook);

route.patch('/updateBook', verifyAdminLogin, updateBook);



export default route;