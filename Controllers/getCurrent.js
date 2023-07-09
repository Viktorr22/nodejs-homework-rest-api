const bcrypt = require("bcryptjs");
const { User } = require("../models/users");
const { RequestError } = require("../helpers/requestError");

const getCurrent = async (req, res) => {
  const { email, name } = req.user;
  res.json({ email, name });
};

module.exports = getCurrent;
