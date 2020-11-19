import snakeCaseKeys from 'snakecase-keys';

export default (params) =>
  JSON.stringify(snakeCaseKeys(params, { deep: true }));
