const Contact = require("../models/contacts");
const { RequestError } = require("../helpers/requestError");

const removeById = async (req, res) => {
  const { contactId } = req.params;
  const result = await Contact.findByIdAndDelete(contactId);
  if (!result) {
    throw RequestError(404, "Not found");
  }
  res.json("message: contact deleted");
};

module.exports = removeById;
