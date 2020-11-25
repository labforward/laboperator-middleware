describe('Laboperator API client', () => {
  it('should be resolved', async () => {
    const client = await require('./client').default;

    expect(client).to.have.property('apis');
  });
});
