import express  from 'express';
import { register} from '../controllers/auth.js';

const route = express.Router();

route.get('/registration',register);

export default route;