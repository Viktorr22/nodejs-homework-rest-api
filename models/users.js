const { Schema, model } = require("mongoose");
const joi = require("joi");
const handleMongooseError = require("../helpers/handleMongooseError");

const emailRegexp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    email: {
      type: String,
      match: emailRegexp,
      required: [true, "Email is required"],
      unique: true,
    },
    subscription: {
      type: String,
      enum: ["starter", "pro", "business"],
      default: "starter",
    },
    token: {
      type: String,
      default: null,
    },
  },
  { versionKey: false, timestamps: true }
);

const registerSchema = joi.object({
  name: joi.string().required(),
  email: joi.string().pattern(emailRegexp).required(),
  password: joi.string().required(),
});

const loginSchema = joi.object({
  email: joi.string().pattern(emailRegexp).required(),
  password: joi.string().required(),
});

userSchema.post("save", handleMongooseError);

const shemas = { registerSchema, loginSchema };

const User = model("user", userSchema);

module.exports = { User, shemas };
