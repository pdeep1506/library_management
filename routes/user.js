import express  from 'express';
import { allUsers, allAdmin, allNotAdmin, getUser, changeData } from '../controllers/user.js';
import { verifyAdminLogin} from '../middleware/verifyAdmin.js'
import { verifyLogin } from '../middleware/verifyLogin.js';
import { userValidate } from '../middleware/schemaValidator.js';
const route = express.Router();

route.get('/allUsers',verifyAdminLogin,allUsers);
route.get('/allAdmin',verifyAdminLogin,allAdmin);
route.get('/allNotAdmin',verifyAdminLogin,allNotAdmin);
route.get('/getUser/',verifyAdminLogin ,getUser)
route.put('/updateUser/:id', verifyLogin,userValidate,changeData);



export default route;