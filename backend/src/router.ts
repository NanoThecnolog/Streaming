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

const router = Router()

router.get('/pix', new GeneratePixController().handle);

router.post('/user', new CreateUserController().handle);
router.post('/login', new AuthUserController().handle);
router.put('/user', new EditUserController().handle)
router.get('/users', new ListUserController().handle)
router.delete('/user', new DeleteUserController().handle)

router.get('/ativar', new ActiveUserController().handle);

router.post('/movie/adicionar/varios', new CreateManyMovieController().handle)
router.post('/movie/adicionar', new CreateMovieController().handle)
router.get('/movies', new ListMoviesController().handle)

router.post('/watchLater', new WatchLaterController().handle)
router.get('/watchLater', new ListWatchLaterController().handle)
router.delete('/watchLater/:id', new RemoveWatchLaterController().handle)

export { router }