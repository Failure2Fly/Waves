const express = require ('express');
const app = express();
const mongoose = require('mongoose');
const xss = require('xss-clean');
const mongoSanitize = require('express-mongo-sanitize');
const routes = require('./routes');

//// body parser
app.use(express.json());


//// anitize
app.use(xss())
app.use(mongoSanitize())


//// routes
app.use('/api', routes);



const port = process.env.PORT || 3001;
app.listen(port, () => { 
  console.log(`Server running on port ${port}`);  
});