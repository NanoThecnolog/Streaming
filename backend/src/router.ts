import { Router } from "express";
import { GeneratePixController } from "./Controllers/GeneratePixController";
import { CreateUserController } from "./Controllers/User/CreateUserController";
import { ActiveUserController } from "./Controllers/User/ActiveUserController";
import { AuthUserController } from "./Controllers/User/AuthUserController";
import { EditUserController } from "./Controllers/User/EditUserController";

const router = Router()

router.get('/pix', new GeneratePixController().handle);

router.post('/user', new CreateUserController().handle);
router.post('/login', new AuthUserController().handle);
router.put('/user', new EditUserController().handle)

router.get('/ativar', new ActiveUserController().handle);

export { router }