const { User } = require('../models/user');
const httpStatus = require('http-status');
const { ApiError } = require('../middleware/apiError');
const userService = require('./user.service');


const createUser = async(email, password) => { 
  try{
    if(await User.emailTaken(email)){
      throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken');
    }
    const user = new User({
      email, 
      password
    });
    await user.save();
    return user;
  } catch(error) { 
    throw error;
  }
}


const genAuthToken = (user) => { 
  const token = user.generateAuthToken();
  return token;
}


const signInWithEmailAndPassword = async(email, password) => { 
  try{
    const user = await userService.findUserByEmail(email, password);
    if (!user) {
      throw new ApiError(httpStatus.UNAUTHORIZED, 'Email has not been registered');
    }
    if(!await user.isPasswordMatch(password)) { 
      throw new ApiError(httpStatus.UNAUTHORIZED, 'incorrect password');
    }

    return user;
  } catch(error) { 
    throw error;
  }
}


module.exports = {
  createUser,
  genAuthToken,
  signInWithEmailAndPassword
}