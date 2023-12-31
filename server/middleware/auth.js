const passport = require('passport');
const { ApiError } = require('./apiError');
const httpStatus = require('http-status');
const { roles } = require('../config/roles');


const verify = (req, res, resolve, reject, rights) => async(err, user) => {
  if(err || !user) { 
    return reject(new ApiError(httpStatus.UNAUTHORIZED, 'Please authenticate'));
  }

  req.user = user;

  //// This is where we can check for roles
  if(rights.length){
    const action = rights[0] /// createAny, readyAny
    const resource = rights[1] /// dog, profile, user
    const permission = roles.can(req.user.role)[action](resource);
    if(!permission.granted){
      return reject(new ApiError(httpStatus.FORBIDDEN,"You do not have the permission to access this." ))
    }
    res.locals.permission = permission;
  }

  resolve()
}


const auth = (...rights) => async(req, res, next) => { 
  return new Promise((resolve, reject) => { 
    passport.authenticate('jwt', { session: false }, verify(req, res, resolve, reject, rights))
    (req, res, next)
  })
  .then(() => next())
  .catch((error) => next(error));
};


module.exports = {
  auth
};