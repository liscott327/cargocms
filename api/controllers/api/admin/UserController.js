module.exports = {

  find: async (req, res) => {
    try {
      let {query} = req

      const findQuery = FormatService.getQueryObj(query);
      let result = await User.findAndCountAll(findQuery)
      sails.log.debug(JSON.stringify(result, null, 2));

      // ,"recordsTotal":57,"recordsFiltered":57,"data"

      let data = result.rows
      let recordsTotal = data.length
      let recordsFiltered =  result.count
      let draw = parseInt(req.draw) + 1
      res.ok({draw, recordsTotal, recordsFiltered, data});
    } catch (e) {
      res.serverError({ message: e, data: {}});
    }
  },
  findOne: async (req, res) => {
    console.log("=== findOne ===");
    const { id } = req.params;
    try {
      const user = await User.findOneWithPassport({id})
      sails.log.info('get user =>', user);
      res.ok({
        message: 'Get user success.',
        data: user,
      });
    } catch (e) {
      res.serverError({ message: e, data: {}});
    }
  },

  create: async (req, res) => {
    const data = req.body;
    try {
      sails.log.info('create user controller=>', data);
      const user = await UserService.create(data);
      res.ok({
        message: 'Create user success.',
        data: user,
      });
    } catch (e) {
      res.serverError({ message: e.message, data: {}});
    }
  },

  update: async (req, res) => {
    const { id } = req.params;
    const data = req.body;
    try {
      sails.log.info('update user controller id=>', id);
      sails.log.info('update user controller data=>', data);
      const user = await UserService.update({
        id: id,
        ...data,
      });
      res.ok({
        message: 'Update user success.',
        data: user,
      });
    } catch (e) {
      res.serverError({ message: e.message, data: {}});
    }
  },

  destroy: async (req, res) => {
    const { id } = req.params;
    try {
      sails.log.info('delete user controller=>', id);
      const user = await User.deleteById(id);
      res.ok({
        message: 'Delete user success.',
        data: user,
      });
    } catch (e) {
      res.serverError({ message: e.message, data: {}});
    }
  }
}
