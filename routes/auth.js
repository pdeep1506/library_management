import express  from 'express';
import { register} from '../controllers/auth.js';

const route = express.Router();

route.post('/registration',register);

export default route;