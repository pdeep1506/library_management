import express from 'express';
import { addPublication, getAllPublication,getPublication } from '../controllers/publication.js';
import { verifyAdminLogin} from '../middleware/verifyAdmin.js';
import {publicationValidate } from '../middleware/schemaValidator.js';
const route = express.Router();


// add publication
route.post('/addPublication', verifyAdminLogin, publicationValidate,addPublication);

route.get('/getPublication', verifyAdminLogin, getPublication);
route.get('/getAllPublication', verifyAdminLogin, getAllPublication);
// route.patch();
// route.delete();



export default route;