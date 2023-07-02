const getContacts = require("./getAll");
const getById = require("./getOneById");
const add = require("./add");
const updateById = require("./updateById");
const removeById = require("./removeById");
const patchFavorite = require("./patch");

module.exports = {
  getContacts,
  getById,
  add,
  updateById,
  removeById,
  patchFavorite,
};
