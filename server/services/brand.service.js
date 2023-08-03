const { Brand } = require('../models/brands');

const addBrand = async (brandName) => { 
  try {
    const brand = new Brand({
      name: brandName
    });
    await brand.save();
    return brand;
  } catch (error) {
    throw(error);
  }
};

module.exports = {  
  addBrand
}