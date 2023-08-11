const mongoose = require('mongoose');
const validator = require('validator');


const siteSchema = mongoose.Schema ({ 
  address:{
    required: true,
    type: String,
  },
  hours:{
    required: true,
    type: String,
  },
  phone:{
    required: true,
    type: String,
  },
  email:{
    required: true,
    type: String,
    validate(value) {
      if(!validator.isEmail(value)) {
        throw new Error('Email is invalid');
      }
    }
  }
});


const Site = mongoose.model('Site', siteSchema);
module.exports = { Site }