import { Router } from "express";
import { GeneratePixController } from "./Controllers/GeneratePixController";
import { CreateUserController } from "./Controllers/User/CreateUserController";

const router = Router()

router.get('/pix', new GeneratePixController().handle);

router.post('/user', new CreateUserController().handle);


router.get('/ativar');

export { router }