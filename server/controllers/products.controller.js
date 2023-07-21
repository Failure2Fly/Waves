const { productsService } = require('../services')

const productsController = { 
  async addProduct(req, res, next){
    try{
        const product = await productsService.addProduct(req.body);
        res.json(product)
    } catch(error){
        next(error)
    }
  }
};

module.exports = productsController;