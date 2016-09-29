exports.GET = {
  params: [':id'],
  handler(req, res) {
    return res.send(`product detail ${req.params.id}`);
  },
};
