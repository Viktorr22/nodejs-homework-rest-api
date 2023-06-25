const express = require("express");
const { nanoid } = require("nanoid");
const joi = require("joi");
const router = express.Router();
const {
  listContacts,
  getContactById,
  addContact,
  updateContact,
  removeContact,
} = require("../../models/contacts");
const { RequestError } = require("../../helpers/requestError");

const contactSchema = joi.object({
  name: joi.string().required(),
  email: joi.string().required(),
  phone: joi.string().required(),
});

router.get("/", async (req, res) => {
  try {
    const result = await listContacts();
    res.json(result);
  } catch (error) {
    const { status = 500, message = "Not found" } = error;
    res.status(status).json({ message });
  }
});

router.get("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await getContactById(contactId);
    if (!result) {
      throw RequestError(404, "Not found");
    }
    res.json(result);
  } catch (error) {
    const { status = 500, message = "Not found" } = error;
    res.status(status).json({ message });
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { error } = contactSchema.validate(req.body);
    if (error) {
      throw RequestError(400, error.message);
    }
    const result = await addContact(req.body);
    return res.status(201).json(result);
  } catch (error) {
    const { status = 500, message = "Not found" } = error;
    res.status(status).json({ message });
  }
});

router.put("/:contactId", async (req, res, next) => {
  try {
    const { error } = contactSchema.validate(req.body);
    if (error) {
      throw RequestError(400, error.message);
    }
    const { contactId } = req.params;
    const result = await updateContact(contactId, req.body);
    if (!result) {
      throw RequestError(404, "missing fields");
    }
    res.json(result);
  } catch (error) {
    const { status = 500, message = "Not found" } = error;
    res.status(status).json({ message });
  }
});

router.delete("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await removeContact(contactId);
    if (!result) {
      throw RequestError(404, "Not found");
    }
    res.json("message: contact deleted");
  } catch (error) {
    const { status = 500, message = "Not found" } = error;
    res.status(status).json({ message });
  }
});

module.exports = router;
