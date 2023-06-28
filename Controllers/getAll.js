const { listContacts } = require("../models/contacts");

const getContacts = async (req, res) => {
  const result = await listContacts();
  res.json(result);
};

module.exports = getContacts;
