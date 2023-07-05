const Contact = require("../models/contacts");
const { RequestError } = require("../helpers/requestError");

const patchFavorite = async (req, res, next) => {
  const { contactId } = req.params;
  const result = await Contact.findByIdAndUpdate(contactId, req.body, {
    new: true,
  });
  if (!result) {
    throw RequestError(404, "Not Found");
  }
  res.json(result);
};

module.exports = patchFavorite;
