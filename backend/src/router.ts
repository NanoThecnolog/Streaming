import { Router } from "express";
import { GeneratePixController } from "./Controllers/GeneratePixController";
import { CreateUserController } from "./Controllers/User/CreateUserController";
import { ActiveUserController } from "./Controllers/User/ActiveUserController";
import { AuthUserController } from "./Controllers/User/AuthUserController";
import { EditUserController } from "./Controllers/User/EditUserController";
import { CreateManyMovieController } from "./Controllers/Movie/CreateManyMovieController";
import { CreateMovieController } from "./Controllers/Movie/CreateMovieController";
import { ListMoviesController } from "./Controllers/Movie/ListMoviesController";
import { ListUserController } from "./Controllers/User/ListUserController";
import { DeleteUserController } from "./Controllers/User/DeleteUserController";
import { WatchLaterController } from "./Controllers/User/WatchLaterController";
import { ListWatchLaterController } from "./Controllers/User/ListWatchLaterController";
import { RemoveWatchLaterController } from "./Controllers/User/RemoveWatchLaterController";
import { DetailUserController } from "./Controllers/User/DetailUserController";
import { GenerateRecoverTokenController } from "./Controllers/User/GenerateRecoverTokenController";
import { RecoverController } from "./Controllers/User/RecoverController";
import { FavoriteController } from "./Controllers/User/FavoriteController";
import { ListFavoriteController } from "./Controllers/User/ListFavoriteController";
import { RemoveFavoriteController } from "./Controllers/User/RemoveFavoriteController";
import { PromotionalEmailController } from "./Controllers/Email/PromotionalEmailController";
import { Authenticate } from "./middlewares/Auth";
import { ADMAuth } from "./middlewares/ADMAuth";
import { EmailInfoController } from "./Controllers/Email/EmailInfoController";
import { RequestContentController } from "./Controllers/Email/RequestContent";
import { ProblemNotificationController } from "./Controllers/Movie/ProblemNotificationController";



const router = Router()

router.get('/acordar', (req, res) => {
    res.json({ status: 'acordado' })

})

router.get('/pix', new GeneratePixController().handle);

router.post('/user', new CreateUserController().handle);//ok
router.post('/login', new AuthUserController().handle);//ok
router.put('/user', Authenticate, new EditUserController().handle)
router.get('/users', ADMAuth, new ListUserController().handle)
router.delete('/user', new DeleteUserController().handle)
router.get('/user', Authenticate, new DetailUserController().handle);
router.post('/recovertoken', new GenerateRecoverTokenController().handle);
router.put('/recover', new RecoverController().handle);//ok

router.post('/ativar', new ActiveUserController().handle);//ok

router.post('/movie/adicionar/varios', new CreateManyMovieController().handle)
router.post('/movie/adicionar', new CreateMovieController().handle)
router.get('/movies', new ListMoviesController().handle)

router.post('/watchLater', new WatchLaterController().handle)
router.get('/watchLater', new ListWatchLaterController().handle)
router.delete('/watchLater/:id', new RemoveWatchLaterController().handle)

router.post('/favorite', new FavoriteController().handle)
router.get('/favorites', new ListFavoriteController().handle)
router.delete('/favorite/:favoriteid', new RemoveFavoriteController().handle)

//emails
router.post('/system/notification/problem', Authenticate, new ProblemNotificationController().handle) // ok
router.post('/promotional', Authenticate, new PromotionalEmailController().handle)//ok
router.post('/info', Authenticate, new EmailInfoController().handle)
router.post('/request/content', Authenticate, new RequestContentController().handle)//ok

export { router }