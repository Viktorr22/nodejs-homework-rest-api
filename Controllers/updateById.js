const Contact = require("../models/contacts");
const { RequestError } = require("../helpers/requestError");

const updateById = async (req, res) => {
  const { contactId } = req.params;
  const result = await Contact.findByIdAndUpdate(contactId, req.body, {
    new: true,
    select: "-createdAt -updatedAt",
  });
  if (!result) {
    throw RequestError(400, "missing fields");
  }
  res.json(result);
};

module.exports = updateById;
