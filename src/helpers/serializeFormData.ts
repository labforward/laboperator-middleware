import _ from 'lodash';
import FormData from 'form-data';

export default (params) => {
  const formData = new FormData();

  _.each(params, (value, key) => {
    formData.append(_.snakeCase(key), value);
  });

  return formData;
};
