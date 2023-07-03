const { updateContact } = require("../models/contacts");
const { RequestError } = require("../helpers/requestError");

const updateById = async (req, res) => {
  const { contactId } = req.params;
  const result = await updateContact(contactId, req.body);
  if (!result) {
    throw RequestError(400, "missing fields");
  }
  res.json(result);
};

module.exports = updateById;
