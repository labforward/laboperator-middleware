import _ from 'lodash';
import FormData from 'form-data';

export default (
  params: Record<string, Parameters<FormData['append']>[1]>
): FormData => {
  const formData = new FormData();

  _.each(params, (value, key) => {
    formData.append(_.snakeCase(key), value);
  });

  return formData;
};
