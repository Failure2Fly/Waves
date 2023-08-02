const { User } = require('../models/user');
const httpStatus = require('http-status');
const { ApiError } = require('../middleware/apiError');
const jwt = require('jsonwebtoken');
require('dotenv').config();


const validateToken = async(token) => { 
  return jwt.verify(token, process.env.JWT_SECRET);
}


const findUserByEmail = async(email) => { 
  return User.findOne({ email });
}


const findUserById = async(_id) => { 
  return await User.findById(_id);
}


const updateUserProfile = async(req) => { 
  try {
    const user = await User.findOneAndUpdate(
      { _id: req.user._id },
      {
        '$set': {
          ...req.body.data /// make sure to validate what you want to patch !!!!!!
        }
      },
      { new: true }
    );
    if(!user) {
      throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
    }
    return user;
  } catch(error) {
    throw error;
  }
}


const updateUserEmail = async(req) => { 
  try {
    if(await User.emailTaken(req.body.newEmail)) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken');
    }
    const user = await User.findOneAndUpdate(
      { _id: req.user._id, email: req.user.email },
      {
        '$set': {
          email: req.body.newEmail,
          verified: false
        }
      },
      { new: true }
    );
    if(!user) {
      throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
    }
    return user;

  } catch (error) {
    throw error;
  }
}


module.exports = {
  validateToken,
  findUserByEmail,
  findUserById,
  updateUserProfile,
  updateUserEmail
}