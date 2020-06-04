module.exports = (e) => {
  let message;

  // rejected fetch request
  if (e.response) {
    const { body } = e.response;

    message = body.error_description;
  }

  // Error object
  return message || e.message;
};
