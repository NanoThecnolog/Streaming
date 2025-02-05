import { Router } from 'express';
//import { CreateUserController } from './Controllers/userController';
import { CreateUser } from './Controllers/userController';



const router = Router();

router.get('/test', (req, res) => {
    res.status(200).json({ message: "funcionando" })
})

router.post('/create', (req, res) => { new CreateUser().handle(req, res) })

export { router };
