const FormData = require('form-data');
const _ = require('lodash');

module.exports = (params) => {
  const formData = new FormData();

  _.each(params, (value, key) => {
    formData.append(_.snakeCase(key), value);
  });

  return formData;
};
