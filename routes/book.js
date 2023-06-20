import express from 'express';
import { bookValidate } from '../middleware/schemaValidator.js';
import { verifyAdminLogin} from '../middleware/verifyAdmin.js';
import { verifyLogin } from '../middleware/verifyLogin.js';
import {saveBooks, getAllBooks, sortByPrice} from '../controllers/book.js';
const route = express.Router();



route.post('/addBook', verifyAdminLogin, bookValidate, saveBooks);
route.get('/getAllBooks', verifyAdminLogin, getAllBooks)
route.get('/sort', verifyLogin, sortByPrice)



export default route;