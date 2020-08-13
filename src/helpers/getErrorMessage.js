module.exports = (e) => {
  let message;

  // rejected fetch request
  if (e.response) {
    const { body = {} } = e.response;
    const { errors: [error] = [] } = body;

    message = (error && error.detail) || body.error_description;
  }

  // Error object
  return message || e.message;
};
