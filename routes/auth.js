import express  from 'express';
import { register, login, Adminregister} from '../controllers/auth.js';
import { userValidate, adminValidate } from '../middleware/schemaValidator.js';
const route = express.Router();

route.post('/registration',userValidate,register);
route.post('/login', login);
route.post('/adminRegister', adminValidate,Adminregister);


//  login
//  verify account
//  change password (  user login required )

//  create librarian
// verify librarian

export default route;