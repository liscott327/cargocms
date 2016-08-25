describe('about Slogan Controller operation.', function() {
  /*describe('update slogan', () => {
    let updateSlogan;
    before(async (done) => {
      try {
        updateSlogan = await Slogan.create({
          content: '456',
          source: '456',
        });
        console.log(updateSlogan);
        done();
      } catch (e) {
        done(e);
      }
    });

    it.only('should success.', async (done) => {
      try {
        const res = await request(sails.hooks.http.app)
        .put(`/api/admin/slogan/${updateSlogan.id}`)
        .send({
          content: '333',
          source: '666',
        });
        console.log("!!!",res.body);
        res.body.dataValues.content.should.be.equal('333');
        res.body.dataValues.source.should.be.equal('666');
        done();
      } catch (e) {
        done(e);
      }
    });
  });*/
  describe('Update Slogan', () => {
      let updateThisSlogan;
      const updateSlogan = {
        content: 'Gives You Wings.',
        source:'RedBull Inc.'
      };

      before( async (done) => {
        try{
          updateThisSlogan = await Slogan.create({
            content:'this for update',
            source:'modify me'
          });

          sails.log.info('updateThisSlogan.id =>', updateThisSlogan.id);
          done();
        }
        catch(e){
          done(e);
        }
      });

      it.only('Should success', async (done) =>{
        try{
          let result = await request(sails.hooks.http.app)
          .put(`/api/admin/slogan/${updateThisSlogan.id}`)
          .send(updateSlogan);

          result.status.should.eq(200);
          result.body.data.content.should.be.equal(updateSlogan.content);
          done();
        }
        catch(e){
          done(e);
        }
      });
    });
});
