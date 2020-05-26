const app = require('.');

describe('Sample Route', () => {
  describe('GET /', () => {
    // Test to get all students record
    it('should get all students record', (done) => {
      request(app)
        .get('/')
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.containSubset({
            status: 'OK',
            code: 200,
          });
          done();
        });
    });
  });
});
