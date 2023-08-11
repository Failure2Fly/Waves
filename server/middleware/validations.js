const { check, validationResult } = require('express-validator');
const httpStatus = require('http-status');


const addProductValidation = [
  check('model')
    .trim().not().isEmpty().withMessage('Model is required').bail()
    .isLength({ min: 3 }).withMessage('Model name must be at least 3 characters long'),

  check('brand')
    .trim().not().isEmpty().withMessage('Brand is required'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(httpStatus.BAD_REQUEST).json({ 
        errors: errors.array()
      });
    }
    next();
  }
]; 


module.exports = { 
  addProductValidation
}