import { Router } from 'express';
import { CreateUserController } from '../Controllers/userController';


const router = Router();

router.post('/create', new CreateUserController().handle);

export default router;
