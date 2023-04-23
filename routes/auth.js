import express  from 'express';
import { register, login, Adminregister} from '../controllers/auth.js';

const route = express.Router();

route.post('/registration',register);
route.post('/login', login);
route.post('/adminRegister', Adminregister);
//  login
//  verify account
//  change password (  user login required )

//  create librarian
// verify librarian

export default route;