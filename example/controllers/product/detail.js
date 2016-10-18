exports.index = {
  params: [':id'],
  middlewares: [
    function (req, res, next) {
      console.log('Middleware 1');
      next();
    },
    function (req, res, next) {
      console.log('Middleware 2');
      next();
    },
  ],
  handler(req, res) {
    return res.send(`product detail ${req.params.id}`);
  },
};

exports.api = (req, res) => {
  return res.send('Product detail api');
};
