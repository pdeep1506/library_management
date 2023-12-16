import express  from 'express';
import { getAllUsers, getAllAdmin, getAllNotAdmin, getUser, updateUser, searchUser,sortUser } from '../controllers/user.js';
import { verifyAdminLogin} from '../middleware/verifyAdmin.js'
import { verifyLogin } from '../middleware/verifyLogin.js';
import { userValidate } from '../middleware/schemaValidator.js';

import checkUserRole from '../middleware/checkUserRole.js'
import { ROLES } from '../utillis/ROLE.js';
const route = express.Router();

route.get('/getAllUsers',checkUserRole(ROLES.Admin),getAllUsers);
route.get('/getAllAdmin',checkUserRole(ROLES.Admin),getAllAdmin);
route.get('/getAllNotAdmin',checkUserRole(ROLES.Admin),getAllNotAdmin);
route.get('/getUser/',checkUserRole(ROLES.Admin) ,getUser)
route.put('/updateUser/:id', checkUserRole(ROLES.User),userValidate,updateUser);
route.get('/sortUser', checkUserRole(ROLES.Admin), sortUser);
route.get('/searchUser', checkUserRole(ROLES.Admin), searchUser)


export default route;