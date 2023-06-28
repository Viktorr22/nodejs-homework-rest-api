const express = require("express");
const {
  getContacts,
  getById,
  add,
  updateById,
  removeById,
} = require("../../Controllers");
const controllerWrapper = require("../../helpers/controllerWrapper");
const contactSchema = require("../../Schemas/contacts");
const validateBody = require("../../middlewares/validateBody");
const router = express.Router();

router.get("/", controllerWrapper(getContacts));

router.get("/:contactId", controllerWrapper(getById));

router.post("/", validateBody(contactSchema), controllerWrapper(add));

router.put(
  "/:contactId",
  validateBody(contactSchema),
  controllerWrapper(updateById)
);

router.delete("/:contactId", controllerWrapper(removeById));

module.exports = router;
