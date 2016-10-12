const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');

const Schema = mongoose.Schema;


// define our model
const userSchema = new Schema({
  email: { type: String, unique: true, lowercase: true },
  password: String
});

// On save Hook, encrypt password
userSchema.pre('save', function (next) {
  const user = this;

  bcrypt.genSalt(10, (err, salt) => {
    if (err) { return next(err); }

    console.log(this);
    bcrypt.hash(user.password, salt, null, (error, hash) => {
      if (error) { return next(err); }

      user.password = hash;
      next();
    });
  });
});

userSchema.methods.comparePasswords = function (attemptedPassword, callback) {
  bcrypt.compare(attemptedPassword, this.password, (err, isMatch) => {
    if (err) { return callback(err); }

    callback(null, isMatch);
  });
};

// create the model class
const ModelClass = mongoose.model('user', userSchema);
// export the model


module.exports = ModelClass;
