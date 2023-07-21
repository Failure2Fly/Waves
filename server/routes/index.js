const express = require('express');
const authRoute = require('./auth.route');
const productsRoute = require('./product.route');
const router = express.Router();

const routesIndex = [
  {
    path: '/auth',
    route: authRoute,
  },
  {
    path:'/products',
    route: productsRoute 
  }
]

routesIndex.forEach((route) => { 
  router.use(route.path, route.route);
});



module.exports = router;


