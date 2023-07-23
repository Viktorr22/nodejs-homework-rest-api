const express = require("express");
const { validateBody, authenticate, upload } = require("../../middlewares");
const { shemas } = require("../../models/users");
const {
  register,
  login,
  getCurrent,
  logout,
  updateAvatar,
  verifyEmail,
  resendVerifyEmail,
} = require("../../controllers");
const controllerWrapper = require("../../helpers/controllerWrapper");

const router = express.Router();

router.post(
  "/register",
  validateBody(shemas.registerSchema),
  controllerWrapper(register)
);

router.get("/verify/:verificationToken", controllerWrapper(verifyEmail));

router.post(
  "/verify",
  validateBody(shemas.emailSchema),
  controllerWrapper(resendVerifyEmail)
);

router.post(
  "/login",
  validateBody(shemas.loginSchema),
  controllerWrapper(login)
);

router.get("/current", authenticate, controllerWrapper(getCurrent));

router.post("/logout", authenticate, controllerWrapper(logout));

router.patch(
  "/avatars",
  authenticate,
  upload.single("avatar"),
  controllerWrapper(updateAvatar)
);

module.exports = router;
