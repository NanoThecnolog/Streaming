import { Router } from "express";
import { GeneratePixController } from "./Controllers/GeneratePixController";
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
import { ProfileGuard } from "./middlewares/ProfileGuard";
import rateLimit from "express-rate-limit";
import { AccessController } from "./Controllers/User/AccessController";
import { TrackingController } from "./Controllers/User/trackingController";
import { ListWatchedController } from "./Controllers/User/ListWatchedController";
import { CreateWatchedController } from "./Controllers/User/CreateWatchedController";
import { GetWatchedController } from "./Controllers/User/GetWatchedController";
import { EmailVerifyController } from "./Controllers/Email/EmailVerifyController";
import { CheckoutEventController } from "./Controllers/CheckoutEvent/CheckoutEventController";
import { DashboardController } from "./Controllers/Dashboard/DashboardController";
import {
  ListSessionsController,
  LogoutController,
  RefreshSessionController,
  RevokeOtherSessionsController,
  RevokeSessionController,
} from "./Controllers/User/AuthSessionController";
import {
  ListTrustedDevicesController,
  RevokeOtherDevicesController,
  RevokeTrustedDeviceController,
} from "./Controllers/User/TrustedDeviceController";
import {
  ResendDeviceCodeController,
  VerifyDeviceController,
} from "./Controllers/User/DeviceVerificationController";
import { CreateProfileController } from "./Controllers/Profile/CreateProfileController";
import { ListProfilesController } from "./Controllers/Profile/ListProfilesController";
import { EditProfileController } from "./Controllers/Profile/EditProfileController";
import { DeleteProfileController } from "./Controllers/Profile/DeleteProfileController";
import { GetProfilePreferencesController } from "./Controllers/Profile/GetProfilePreferencesController";
import { UpdateProfilePreferencesController } from "./Controllers/Profile/UpdateProfilePreferencesController";
import { GenreListController } from "./Controllers/Content/GenreListController";

const router = Router();

const loginRateLimit = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 10,
  skipSuccessfulRequests: true,
  standardHeaders: "draft-8",
  legacyHeaders: false,
  message: { error: "Max attempts exceed. Please try later." },
});

const deviceVerificationRateLimit = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 20,
  standardHeaders: "draft-8",
  legacyHeaders: false,
  message: { error: "Muitas tentativas. Tente novamente mais tarde." },
});

const recoveryRateLimit = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 5,
  standardHeaders: "draft-8",
  legacyHeaders: false,
  message: {
    error: "Muitas tentativas de recuperação. Tente novamente mais tarde.",
  },
});

const sessionRefreshRateLimit = rateLimit({
  windowMs: 5 * 60 * 1000,
  limit: 30,
  standardHeaders: "draft-8",
  legacyHeaders: false,
  message: {
    error: "Muitas tentativas de renovação. Tente novamente mais tarde.",
  },
});

router.get("/acordar", (req, res) => {
  res.json({ status: "acordado" });
});

router.get("/pix", new GeneratePixController().handle);

router.post("/login", loginRateLimit, new AuthUserController().handle);
router.post(
  "/login/device/verify",
  deviceVerificationRateLimit,
  new VerifyDeviceController().handle,
);
router.post(
  "/login/device/resend",
  deviceVerificationRateLimit,
  new ResendDeviceCodeController().handle,
);
router.post("/logout", Authenticate, new LogoutController().handle);
router.post(
  "/session/refresh",
  Authenticate,
  sessionRefreshRateLimit,
  new RefreshSessionController().handle,
);
router.get("/sessions", Authenticate, new ListSessionsController().handle);
router.delete(
  "/sessions",
  Authenticate,
  new RevokeOtherSessionsController().handle,
);
router.delete(
  "/sessions/:id",
  Authenticate,
  new RevokeSessionController().handle,
);
router.get("/devices", Authenticate, new ListTrustedDevicesController().handle);
router.delete(
  "/devices",
  Authenticate,
  new RevokeOtherDevicesController().handle,
);
router.delete(
  "/devices/:id",
  Authenticate,
  new RevokeTrustedDeviceController().handle,
);
router.put("/user", Authenticate, new EditUserController().handle);
router.get("/users", ADMAuth, new ListUserController().handle);
router.delete("/user", ADMAuth, new DeleteUserController().handle);
router.get("/user", Authenticate, new DetailUserController().handle);
router.post(
  "/recovertoken",
  recoveryRateLimit,
  new GenerateRecoverTokenController().handle,
);
router.put("/recover", recoveryRateLimit, new RecoverController().handle);
router.post("/track", Authenticate, ProfileGuard, new TrackingController().handle);
router.post("/user/verify", new EmailVerifyController().handle);

router.get("/user/access", Authenticate, new AccessController().handle);

router.post("/watchLater", Authenticate, ProfileGuard, new WatchLaterController().handle);
router.get("/watchLater", Authenticate, ProfileGuard, new ListWatchLaterController().handle);
router.delete(
  "/watchLater/:id",
  Authenticate,
  ProfileGuard,
  new RemoveWatchLaterController().handle,
);

router.get("/user/watched", Authenticate, ProfileGuard, new ListWatchedController().handle);

router.post(
  "/content/watched",
  Authenticate,
  ProfileGuard,
  new CreateWatchedController().handle,
);
router.get("/content/watched", Authenticate, ProfileGuard, new GetWatchedController().handle);

router.post(
  "/checkout/events",
  new CheckoutEventController().handle.bind(CheckoutEventController),
);

router.get("/admin/dashboard", ADMAuth, new DashboardController().handle);
router.get("/admin/subscriptions", ADMAuth, new DashboardController().subscriptions);

router.post("/profiles", Authenticate, new CreateProfileController().handle);
router.get("/profiles", Authenticate, new ListProfilesController().handle);
router.put("/profiles/:id", Authenticate, new EditProfileController().handle);
router.delete("/profiles/:id", Authenticate, new DeleteProfileController().handle);

router.get("/profiles/:id/preferences", Authenticate, new GetProfilePreferencesController().handle);
router.put("/profiles/:id/preferences", Authenticate, new UpdateProfilePreferencesController().handle);

router.get("/genres", new GenreListController().handle);

export { router };
