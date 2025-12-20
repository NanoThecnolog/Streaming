import { Router } from "express";
import { GeneratePixController } from "./Controllers/GeneratePixController";
import { CreateUserController } from "./Controllers/User/CreateUserController";
import { ActiveUserController } from "./Controllers/User/ActiveUserController";
import { AuthUserController } from "./Controllers/User/AuthUserController";
import { EditUserController } from "./Controllers/User/EditUserController";
import { ListUserController } from "./Controllers/User/ListUserController";
import { DeleteUserController } from "./Controllers/User/DeleteUserController";
import { WatchLaterController } from "./Controllers/User/WatchLaterController";
import { ListWatchLaterController } from "./Controllers/User/ListWatchLaterController";
import { RemoveWatchLaterController } from "./Controllers/User/RemoveWatchLaterController";
import { DetailUserController } from "./Controllers/User/DetailUserController";
import { GenerateRecoverTokenController } from "./Controllers/User/GenerateRecoverTokenController";
import { RecoverController } from "./Controllers/User/RecoverController";
import { Authenticate } from "./middlewares/Auth";
import { ADMAuth } from "./middlewares/ADMAuth";
import rateLimit from "express-rate-limit";
import { AccessController } from "./Controllers/User/AccessController";
import { TrackingController } from "./Controllers/User/trackingController";

const router = Router()

const loginRateLimit = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 10,
    message: { error: "Max attempts exceed. Please try later.--" }
})

router.get('/acordar', (req, res) => {
    res.json({ status: 'acordado' })
})

router.get('/pix', new GeneratePixController().handle);

router.post('/user', new CreateUserController().handle);
router.post('/login', loginRateLimit, new AuthUserController().handle);
router.put('/user', Authenticate, new EditUserController().handle)
router.get('/users', ADMAuth, new ListUserController().handle)
router.delete('/user', ADMAuth, new DeleteUserController().handle)
router.get('/user', Authenticate, new DetailUserController().handle);
router.post('/recovertoken', new GenerateRecoverTokenController().handle);
router.put('/recover', new RecoverController().handle);
router.post('/track', new TrackingController().handle)

router.get('/user/access', Authenticate, new AccessController().handle)

router.post('/ativar', new ActiveUserController().handle);

router.post('/watchLater', Authenticate, new WatchLaterController().handle)
router.get('/watchLater', Authenticate, new ListWatchLaterController().handle)
router.delete('/watchLater/:id', Authenticate, new RemoveWatchLaterController().handle)

export { router }