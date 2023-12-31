const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();


const userSchema = mongoose.Schema({ 
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    validate(value) {
      if(!validator.isEmail(value)) {
        throw new Error('Email is invalid');
      }
    }
  },
  password: {
    type: String,
    required: true,
    trim: true,
  },
  role: {
    type: String, 
    enum: ['user', 'admin'],
    default: 'user'
  },
  firstName: {
    type: String,
    maxLength: 100,
    trim: true,
    default: ''
  },
  lastName: {
    type: String,
    maxLength: 100,
    trim: true,
    default: ''
  },
  cart: {
    type: Array,
    default: []
  },
  history: {
    type: Array,
    default: []
  },
  verified: {
    type: Boolean,
    default: false
  }
});


userSchema.pre('save', async function(next) {
  let user = this;

  if(user.isModified('password')){
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(user.password, salt);
    user.password = hash;
  }

  next();

});


userSchema.methods.generateAuthToken = function() { 
  let user = this;
  const userObj = { sub: user._id.toHexString(), email:user.eamil };
  const token = jwt.sign(userObj, process.env.JWT_SECRET, { expiresIn: '1d' });
  return token;
}


userSchema.methods.generateRegisterToken = function() { 
  let user = this;
  const userObj = { sub: user._id.toHexString()};
  const token = jwt.sign(userObj, process.env.JWT_SECRET, { expiresIn: '2h' });
  return token;
}


userSchema.statics.emailTaken = async function(email) { 
  const user = await this.findOne({ email });
  return !!user;
}


userSchema.methods.isPasswordMatch = async function(candidatePassword) { 
  //// candidatePassword is the unhashed password that the user entered

  const user = this;
  const isMatch = await bcrypt.compare(candidatePassword, user.password);
  return isMatch;
}


const User = mongoose.model('User', userSchema);
module.exports = { User };