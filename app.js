const express = require("express");
const contactsRouter = require("./routes/api/contacts");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const { DB_HOST, PORT } = process.env;

const logger = require("morgan");

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

app.use("/api/contacts", contactsRouter);

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  res.status(500).json({ message: err.message });
});
// app.use((err, req, res, next) => {
//   console.log(res.statusCode);
//   const statusCode = res.statusCode || 500;
//   const errorStack = process.env.NODE_ENV === "development" ? err.stack : null;
//   res.status(statusCode);
//   res.json({ code: statusCode, stack: errorStack });
// });

mongoose
  .connect(DB_HOST)
  .then(() => console.log("Database connection successful"))
  .catch((err) => {
    console.error(err.message);
    process.exit(1);
  });

module.exports = app;
