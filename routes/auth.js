import express  from 'express';
import { register} from '../controllers/auth.js';

const route = express.Router();

route.post('/registration',register);
//  login
//  verify account
//  change password (  user login required )

//  create librarian
// verify librarian

export default route;