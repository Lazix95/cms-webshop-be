const Config = require('./../models/config');

module.exports['init-app']  = async (req, res, next) => {
  const enteryPoint = req.headers.host;

  const config = await Config.findOne({enteryPoint});
  res.status(200).json({config})
}