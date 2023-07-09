const express = require("express");
const { validateBody, authenticate } = require("../../middlewares");
const { shemas } = require("../../models/users");
const { register, login, getCurrent, logout } = require("../../controllers");
const controllerWrapper = require("../../helpers/controllerWrapper");

const router = express.Router();

router.post(
  "/register",
  validateBody(shemas.registerSchema),
  controllerWrapper(register)
);

router.post(
  "/login",
  validateBody(shemas.loginSchema),
  controllerWrapper(login)
);

router.get("/current", authenticate, controllerWrapper(getCurrent));
router.post("/logout", authenticate, controllerWrapper(logout));

module.exports = router;
