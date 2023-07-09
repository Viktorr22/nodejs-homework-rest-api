const messages = {
  400: "Bad Request",
  401: "Not authorized",
  403: "Forbidden",
  404: "Not Found",
  409: "Conflict",
};

const RequestError = (status, message = messages[status]) => {
  const error = new Error(message);
  error.status = status;
  console.log(status);
  return error;
};

module.exports = { RequestError };
