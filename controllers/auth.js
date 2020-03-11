const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('./../models/user');
const Config = require('./../models/config');

module.exports.signup = async (req, res, next) => {
  try {
    const username = req.body.username;
    const email = req.body.email;
    const password = await bcrypt.hash(req.body.password, 12);
    const enteryPoint = `${username}.${req.headers.host}`;
  
    const user = await new User({username, email, password}).save();
    await new Config({userId: user._id, enteryPoint}).save();

    res.status(201).json({message: 'OK'})
  } catch (err) {
    if (!err.statusCode) err.statusCode = 500;
    if (!err.message) err.message = 'Something Went Wrong';
    next(err)
  }
}

module.exports.login = async (req, res, next) => {
  try {
    const email = req.body.username;
    const password = req.body.password;

    const user = await User.findOne({email});

    if (!user) {
      const error = new Error('A user with this email is not found');
      error.statusCode = 401;
      throw error;
    }
    const isEqual = await bcrypt.compare(password, user.password);

    if (!isEqual) {
      const error = new Error('Wrong Password');
      error.statusCode = 401;
      throw error;
    }
  
    const token = jwt.sign({
      userId: user._id.toString(),
    }, process.env.secret, {expiresIn: 3600 + 's'});

    user.token = token;
    user.save()

    const userData = {
    username: user.username,
    token: token
    }

    res.status(200).json(userData);
  } catch (err) {
    if(!err.statusCode) {
      err.statusCode = 500
    }
    next(err)
  }
}

module.exports.invalidate = async (req, res, next) => {
  try {
    const user = await User.findById(req.userId);
    user.token = null;
    user.save()
    req.status(200).json({status: 'OK'})
  } catch (err) {

  }
}