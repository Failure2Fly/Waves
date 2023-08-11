const { Brand } = require('../models/brands');
const { ApiError } = require('../middleware/apiError');
const httpStatus = require('http-status');

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


const getBrandById = async(id) => { 
  try {
    const brand = await Brand.findById(id);
    if(!brand) { 
      throw new ApiError(httpStatus.NOT_FOUND, 'Brand does not exist');
    }
    return brand;
  } catch (error) {
    throw(error);
  }
}

const deleteBrandById = async (id) => { 
  try {
    const brand = await Brand.findByIdAndRemove(id);
    if(!brand) { 
      throw new ApiError(httpStatus.NOT_FOUND, 'Brand does not exist');
    }
   return brand;
  } catch (error) {
    throw(error);
  }
};

const getAllBrands = async (args) => { 
  try {
    let order = args.order ? args.order : 'asc';
    let sortBy = args.sortBy ? args.sortBy : '_id';
    let limit = args.limit ? parseInt(args.limit) : 100;
    const brands = await Brand.find({})
    .limit(limit)
    .sort([
      [sortBy, order]
    ])
    if(!brands) { 
      throw new ApiError(httpStatus.NOT_FOUND, 'No brands found');
    }
    return brands;
  } catch (error) {
    throw(error);
  }
};

module.exports = {  
  addBrand,
  getBrandById,
  deleteBrandById,
  getAllBrands
}