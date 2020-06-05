const { server } = require('laboperator-middleware/test_helper');

describe('Built-in Routes', () => {
  describe('GET /ping', () => {
    it('should be okay', async () => {
      const response = await server().get('/ping');

      expect(response).to.have.status(200);
      expect(response.body).to.containSubset({
        status: 'OK',
        code: 200,
        details: 'It works!',
      });
    });
  });
});
