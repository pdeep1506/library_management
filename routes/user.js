import express  from 'express';
import { allUsers, allAdmin, allNotAdmin, getUser } from '../controllers/user.js';
import { verifyAdminLogin} from '../middleware/verifyAdmin.js'
// import { verifyLogin } from '../middleware/verifyLogin.js';
const route = express.Router();

route.get('/allUsers',verifyAdminLogin,allUsers);
route.get('/allAdmin',verifyAdminLogin,allAdmin);
route.get('/allNotAdmin',verifyAdminLogin,allNotAdmin);
route.get('/getUser/', getUser)

//  login
//  verify account
//  change password (  user login required )

//  create librarian
// verify librarian

export default route;