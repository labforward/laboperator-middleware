"use strict";

var _test_helper = require("./test_helper");
describe('Built-in Routes', () => {
  describe('GET /', () => {
    it('should be okay', async () => {
      const response = await (0, _test_helper.server)().get('/');
      expect(response).toHaveProperty('status', 200);
      expect(response.body).toMatchObject({
        status: 'OK',
        code: 200
      });
    });
  });
  describe('GET /auth/callback', () => {
    describe('given valid code', () => {
      it('response 200', async () => {
        const response = await (0, _test_helper.server)().get('/auth/callback?code=valid-code');
        expect(response).toHaveProperty('status', 200);
        expect(response.body).toMatchObject({
          status: 'OK',
          code: 200
        });
      });
      it("resolve into user's accessTokens", async () => {
        await (0, _test_helper.server)().get('/auth/callback?code=valid-code');
        const laboperator = require('./laboperator');
        const client = await laboperator.client;
        expect(await client.authentication.get('1')).toEqual('laboperator-access-token');
      });
    });
    describe('given missing code (e.g. user deny the authorization)', () => {
      it('response 200', async () => {
        const response = await (0, _test_helper.server)().get('/auth/callback?error=access_denied&error_description=The+resource+owner+or+authorization+server+denied+the+request.');
        expect(response).toHaveProperty('status', 200);
        expect(response.body).toMatchObject({
          status: 'OK',
          code: 200,
          details: 'The resource owner or authorization server denied the request.'
        });
      });
    });
    describe('given invalid code', () => {
      it('response 400 in case of invalid code', async () => {
        const response = await (0, _test_helper.server)().get('/auth/callback?code=invalid-code');
        expect(response).toHaveProperty('status', 400);
        expect(response.body).toMatchObject({
          status: 'Bad Request',
          code: 400,
          details: 'The provided authorization grant is invalid, expired, revoked, does not match the redirection URI used in the authorization request, or was issued to another client.'
        });
      });
    });
  });
  describe('GET /unknown', () => {
    it('response with 404', async () => {
      const response = await (0, _test_helper.server)().get('/unknown');
      expect(response).toHaveProperty('status', 404);
      expect(response.body).toMatchObject({
        status: 'Not Found',
        code: 404
      });
    });
  });
});