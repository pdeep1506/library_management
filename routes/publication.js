import express from 'express';
import { addPublication, getAllPublication,getPublication, updatePublication, sortPublication, searchPublication } from '../controllers/publication.js';
import { verifyAdminLogin} from '../middleware/verifyAdmin.js';
import {publicationValidate } from '../middleware/schemaValidator.js';
import { ROLES } from '../utillis/ROLE.js';
import checkUserRole from '../middleware/checkUserRole.js'
const route = express.Router();


// add publication
route.post('/addPublication', checkUserRole(ROLES.Admin),addPublication);

route.get('/getPublication', checkUserRole(ROLES.Admin), getPublication);
route.get('/getAllPublication', checkUserRole(ROLES.Admin), getAllPublication);
route.put('/updatePublication/:id', checkUserRole(ROLES.Admin), publicationValidate, updatePublication);
// route.delete();

route.get('/sortPublication', verifyAdminLogin, sortPublication);
route.get('/searchPublication', verifyAdminLogin, searchPublication)

export default route;