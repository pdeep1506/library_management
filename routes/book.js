import express from 'express';
import { bookValidate } from '../middleware/schemaValidator.js';
import { verifyAdminLogin} from '../middleware/verifyAdmin.js';
import { verifyLogin } from '../middleware/verifyLogin.js';
import {addBook, getAllBooks, sortBook, searchBook, getBook, updateBook} from '../controllers/book.js';
const route = express.Router();



route.post('/addBook', verifyAdminLogin, bookValidate, addBook);
route.get('/getAllBooks', verifyAdminLogin, getAllBooks)
route.get('/sortBook', verifyLogin, sortBook)
route.get('/searchBook', verifyLogin, searchBook);
route.get('/getBook', verifyAdminLogin, getBook);

route.patch('/updateBook', verifyAdminLogin, updateBook);



export default route;