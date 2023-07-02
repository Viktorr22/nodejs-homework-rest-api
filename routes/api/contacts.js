const express = require("express");
const joi = require("joi");
const {
  getContacts,
  getById,
  add,
  updateById,
  removeById,
  patchFavorite,
} = require("../../Controllers");
const controllerWrapper = require("../../helpers/controllerWrapper");
const validateBody = require("../../middlewares/validateBody");
const isValidId = require("../../middlewares/isValidId");
const router = express.Router();

const contactSchema = joi.object({
  name: joi.string().required(),
  email: joi.string().required(),
  phone: joi.string().required(),
});

const contactUpdateFavoriteSchema = joi.object({
  favorite: joi.boolean().required().error(new Error("missing field favorite")),
});

router.get("/", controllerWrapper(getContacts));

router.get("/:contactId", isValidId, controllerWrapper(getById));

router.post("/", validateBody(contactSchema), controllerWrapper(add));

router.put(
  "/:contactId",
  isValidId,
  validateBody(contactSchema),
  controllerWrapper(updateById)
);

router.delete("/:contactId", isValidId, controllerWrapper(removeById));

router.patch(
  "/:contactId/favorite",
  isValidId,
  validateBody(contactUpdateFavoriteSchema),
  controllerWrapper(patchFavorite)
);

module.exports = router;
