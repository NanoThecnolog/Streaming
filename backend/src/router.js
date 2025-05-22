"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const GeneratePixController_1 = require("./Controllers/GeneratePixController");
const CreateUserController_1 = require("./Controllers/User/CreateUserController");
const ActiveUserController_1 = require("./Controllers/User/ActiveUserController");
const AuthUserController_1 = require("./Controllers/User/AuthUserController");
const EditUserController_1 = require("./Controllers/User/EditUserController");
const ListUserController_1 = require("./Controllers/User/ListUserController");
const DeleteUserController_1 = require("./Controllers/User/DeleteUserController");
const WatchLaterController_1 = require("./Controllers/User/WatchLaterController");
const ListWatchLaterController_1 = require("./Controllers/User/ListWatchLaterController");
const RemoveWatchLaterController_1 = require("./Controllers/User/RemoveWatchLaterController");
const DetailUserController_1 = require("./Controllers/User/DetailUserController");
const GenerateRecoverTokenController_1 = require("./Controllers/User/GenerateRecoverTokenController");
const RecoverController_1 = require("./Controllers/User/RecoverController");
const Auth_1 = require("./middlewares/Auth");
const ADMAuth_1 = require("./middlewares/ADMAuth");
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const AccessController_1 = require("./Controllers/User/AccessController");
const router = (0, express_1.Router)();
exports.router = router;
const loginRateLimit = (0, express_rate_limit_1.default)({
    windowMs: 15 * 60 * 1000,
    max: 10,
    message: { error: "Max attempts exceed. Please try later.--" }
});
router.get('/acordar', (req, res) => {
    res.json({ status: 'acordado' });
});
router.get('/pix', new GeneratePixController_1.GeneratePixController().handle);
router.post('/user', new CreateUserController_1.CreateUserController().handle);
router.post('/login', loginRateLimit, new AuthUserController_1.AuthUserController().handle);
router.put('/user', Auth_1.Authenticate, new EditUserController_1.EditUserController().handle);
router.get('/users', ADMAuth_1.ADMAuth, new ListUserController_1.ListUserController().handle);
router.delete('/user', ADMAuth_1.ADMAuth, new DeleteUserController_1.DeleteUserController().handle);
router.get('/user', Auth_1.Authenticate, new DetailUserController_1.DetailUserController().handle);
router.post('/recovertoken', new GenerateRecoverTokenController_1.GenerateRecoverTokenController().handle);
router.put('/recover', new RecoverController_1.RecoverController().handle);
router.get('/user/access', Auth_1.Authenticate, new AccessController_1.AccessController().handle);
router.post('/ativar', new ActiveUserController_1.ActiveUserController().handle);
router.post('/watchLater', Auth_1.Authenticate, new WatchLaterController_1.WatchLaterController().handle);
router.get('/watchLater', Auth_1.Authenticate, new ListWatchLaterController_1.ListWatchLaterController().handle);
router.delete('/watchLater/:id', Auth_1.Authenticate, new RemoveWatchLaterController_1.RemoveWatchLaterController().handle);
