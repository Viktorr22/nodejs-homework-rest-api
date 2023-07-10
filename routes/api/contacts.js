const express = require("express");
const joi = require("joi");
const {
  getContacts,
  getById,
  add,
  updateById,
  removeById,
  patchFavorite,
} = require("../../controllers");
const controllerWrapper = require("../../helpers/controllerWrapper");
const { validateBody, isValidId, authenticate } = require("../../middlewares");

const router = express.Router();

const contactSchema = joi.object({
  name: joi.string().required(),
  email: joi.string().required(),
  phone: joi.string().required(),
});

const contactUpdateFavoriteSchema = joi.object({
  favorite: joi.boolean().required().error(new Error("missing field favorite")),
});

router.get("/", authenticate, controllerWrapper(getContacts));

router.get("/:contactId", authenticate, isValidId, controllerWrapper(getById));

router.post(
  "/",
  authenticate,
  validateBody(contactSchema),
  controllerWrapper(add)
);

router.put(
  "/:contactId",
  authenticate,
  isValidId,
  validateBody(contactSchema),
  controllerWrapper(updateById)
);

router.delete(
  "/:contactId",
  authenticate,
  isValidId,
  controllerWrapper(removeById)
);

router.patch(
  "/:contactId/favorite",
  authenticate,
  isValidId,
  validateBody(contactUpdateFavoriteSchema),
  controllerWrapper(patchFavorite)
);

module.exports = router;
