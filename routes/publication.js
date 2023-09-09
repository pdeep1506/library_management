import express from 'express';
import { addPublication, getAllPublication,getPublication, updatePublication, sort, search } from '../controllers/publication.js';
import { verifyAdminLogin} from '../middleware/verifyAdmin.js';
import {publicationValidate } from '../middleware/schemaValidator.js';
import { ROLES } from '../utillis/ROLE.js';
import checkUserRole from '../middleware/checkUserRole.js'
const route = express.Router();


// add publication
route.post('/addPublication', checkUserRole(ROLES.Publication),addPublication);

route.get('/getPublication', verifyAdminLogin, getPublication);
route.get('/getAllPublication', verifyAdminLogin, getAllPublication);
route.put('/updatePublication/:id', checkUserRole(ROLES.Publication), publicationValidate, updatePublication);
// route.delete();

route.get('/sort', verifyAdminLogin, sort);
route.get('/search', verifyAdminLogin, search)

export default route;