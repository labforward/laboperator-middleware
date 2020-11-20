import snakeCaseKeys from 'snakecase-keys';

export default (params: Parameters<typeof snakeCaseKeys>[0]): string =>
  JSON.stringify(snakeCaseKeys(params, { deep: true }));
