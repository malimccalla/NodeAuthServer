const User = require('../models/user');

exports.signup = function (req, res, next) {
  //get the posted email and password
  const email = req.body.email;
  const password = req.body.password;

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
      res.json(user);
    });
  });
};
