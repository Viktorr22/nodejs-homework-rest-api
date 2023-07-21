const getContacts = require("./getAll");
const getById = require("./getOneById");
const add = require("./add");
const updateById = require("./updateById");
const removeById = require("./removeById");
const patchFavorite = require("./patch");
const register = require("./auth");
const login = require("./login");
const getCurrent = require("./getCurrent");
const logout = require("./logout");
const updateAvatar = require("./updateAvatar");

module.exports = {
  getContacts,
  getById,
  add,
  updateById,
  removeById,
  patchFavorite,
  register,
  login,
  getCurrent,
  logout,
  updateAvatar,
};
