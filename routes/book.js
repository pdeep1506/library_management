import express from 'express';
import { bookValidate } from '../middleware/schemaValidator.js';
import { verifyAdminLogin} from '../middleware/verifyAdmin.js';
import {saveBooks} from '../controllers/book.js';
const route = express.Router();



route.post('/addBook', verifyAdminLogin, bookValidate, saveBooks);




export default route;