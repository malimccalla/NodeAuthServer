const jwt = require('jwt-simple');
const config = require('../config');
const User = require('../models/user');

function tokenForUser(user) {
  const timestamp = new Date().getTime();
  return jwt.encode({ sub: user.id, iat: timestamp }, config.secret);
}

exports.signup = function (req, res, next) {
  //get the posted email and password
  const email = req.body.email;
  const password = req.body.password;

  if (!email || !password) {
    return res.status(422).send({ error: 'Email and password required' });
  }

  //see if a user with the given email exists
  User.findOne({ email }, (err, existingUser) => {
    if (err) { return next(err); }

    //if user does exits, return error
    if (existingUser) {
      return res.status(422).send({ error: 'Email in use' });
    }

    // if user with email doesnt exist, create and save user record
    const user = new User({ email, password });

    user.save(error => {
      if (error) { return next(err); }

      //respond to incoming request
      res.json({ token: tokenForUser(user) });
    });
  });
};
