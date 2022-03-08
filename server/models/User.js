const mongoose = require('mongoose');
const scrypt = require('scrypt-async');
const crypto = require('crypto');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

// If password has changed, generate random salt

userSchema.pre('save', function (next) {
  if (this.isModified('password')) {
    const salt = crypto.randomBytes(8).toString('hex');
    scrypt(this.password, salt, { encoding: 'hex', N: 16384 }, (result) => {
      this.password = `${result}.${salt}`;
    });
  }
  next();
});

// Compare supplied password with hashed version. Returns a promise that resolves with a boolean

userSchema.methods.comparePasswords = function (suppliedPassword) {
  return new Promise((resolve) => {
    const [hash, salt] = this.password.split('.');
    scrypt(suppliedPassword, salt, { encoding: 'hex', N: 16384 }, (result) => {
      if (result === hash) {
        return resolve(true);
      } else {
        return resolve(false);
      }
    });
  });
};

mongoose.model('User', userSchema);
