const bcrypt = require("bcryptjs");
const { User } = require("../models/users");
const { RequestError } = require("../helpers/requestError");

const register = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw RequestError(409, "Email in use");
  }

  const hashPassword = await bcrypt.hash(password, 10);

  const newUser = await User.create({ ...req.body, password: hashPassword });
  return res.status(201).json({
    name: newUser.name,
    email: newUser.email,
  });
};

module.exports = register;
