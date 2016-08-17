describe('about Slogan Controller operation.', function() {


  describe('update user', () => {
    let updateSlogan;
    const updateSlogan = {
      content: '123',
      source: '123',
    };
    before(async (done) => {
      try {
        updateSlogan = await Slogan.create({
          content: '456',
          source: '456',
        });
        sails.log.info('updateSlogan.data.id=>', updateSlogan.id);
        done();
      } catch (e) {
        done(e);
      }
    });

    it('should success.', async (done) => {
      try {
        const res = await request(sails.hooks.http.app)
        .put(`/api/admin/slogan/${updateSlogan.id}`)
        .send(updateSlogan);
        res.body.data.content.should.be.equal('123');
        res.body.data.source.should.be.equal('123');
        done();
      } catch (e) {
        done(e);
      }
    });
  });

});
