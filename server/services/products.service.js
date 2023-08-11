const { Product } = require('../models/products');
const { ApiError } = require('../middleware/apiError');
const httpStatus = require('http-status');
const mongoose = require('mongoose');


const addProduct = async( body ) => {
  try {
    const product = new Product({
      ...body
    });
    await product.save();
    return product;
  } catch(error) {
    throw error;
  }
}


const getProduct = async( body ) => {
  try {
    const product = new Product({
      ...body
    });
    await product.save();
    return product;
  } catch(error) {
    throw error;
  }
}

const getProductById = async( _id ) => { 
  try {
    const product = await Product.findById(_id).populate('brand');
    if(!product) {
      throw new ApiError(httpStatus.NOT_FOUND, 'Product not found');
    }

    return product;

  } catch (error) {
    throw error;
  }

}

const updateProductById = async( _id, body ) => { 
  try {
    const product = await Product.findOneAndUpdate(
      {_id},
      {"$set": body},
      {new: true}
    );
    if(!product) {
      throw new ApiError(httpStatus.NOT_FOUND, 'Product not found');
    }
    return product;
  } catch (error) {
    throw error;
  }   
}

const deleteProductById = async( _id ) => { 
  try {
    const product = await Product.findOneAndRemove(_id);
    if(!product) {
      throw new ApiError(httpStatus.NOT_FOUND, 'Product not found');
    }
    return product;
  } catch (error) {
    throw error;
  }
}

const allProducts = async( req ) => { 
  try {
    const products = await Product
    .find({})
    .populate('brand')
    .sort([
      [req.query.sortBy, req.query.order]
    ])
    .limit(parseInt(req.query.limit));
    return products;
  } catch (error) {
    throw error;
  }
}

const paginateProducts = async( req ) => { 
  try {

    let aggQueryArray = [];

    // gi stands for global and case insensitive - does not care if the letters are upper or lower case
    if(req.body.keywords && req.body.keywords !== '') {
      const re = new RegExp(`${req.body.keywords}`, 'gi');
      aggQueryArray.push({ 
        $match: { model: { $regex: re } } 
      });
    }

    // the in operator is used to find values that match any value in a specified array
    if(req.body.brand && req.body.brand.length > 0){
      let newBrandsArray = req.body.brand.map((item)=>(
        new mongoose.Types.ObjectId(item)
      ));
      aggQueryArray.push({
        $match:{ brand:{ $in: newBrandsArray }}
      });
    }

    if(req.body.frets && req.body.frets.length > 0){
      aggQueryArray.push({
        $match:{ frets:{ $in: req.body.frets }}
      });1
    }

    if(req.body.min && req.body.min > 0 || req.body.max && req.body.max < 100000){
      // {range: { price: [0, 10000]}}  - Not Supported on free trial

      if(req.body.min){
        aggQueryArray.push({
          $match:{ price:{ $gt: req.body.min }}
          // minimum price, guitar with price greater than whatever if entered in the min field
        });
      }
      if(req.body.max){
        aggQueryArray.push({
          $match:{ price:{ $lt: req.body.max }}
          // maximum price, guitar with price less than whatever if entered in the max field
        });
      }
    }


    //// Add Populate
    aggQueryArray.push(
      {
        $lookup: { 
          from: 'brands',
          localField: 'brand',
          foreignField: '_id',
          as: 'brand'
        }
      },
      {
        $unwind: '$brand'
      }
      
    )



    let aggQuery = Product.aggregate(aggQueryArray);
    const options = { 
      page: parseInt(req.query.page),
      limit: parseInt(req.query.limit),
      sort: { date: 'desc' }
    };
    const products = await Product.aggregatePaginate(aggQuery, options);
    return products;
  } catch (error) {
    throw error;
  }
}


module.exports = {
  addProduct,
  getProduct,
  getProductById,
  updateProductById,
  deleteProductById,
  allProducts,
  paginateProducts
}