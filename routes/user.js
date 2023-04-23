import express  from 'express';
import { allUsers } from '../controllers/user.js';
import { verifyAdminLogin} from '../middleware/verifyAdmin.js'
import { verifyLogin } from '../middleware/verifyLogin.js';
const route = express.Router();

route.get('/allUsers',verifyLogin,allUsers);

//  login
//  verify account
//  change password (  user login required )

//  create librarian
// verify librarian

export default route;