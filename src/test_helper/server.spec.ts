import request from 'supertest';

export default () => request(require('..').default);
