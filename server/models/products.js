// const mongoose = require('mongoose');
// // const Schema = mongoose.Schema;


// const productSchema = mongoose.Schema({ 
//   model: {
//     type: String,
//     required: true,
//     unique: true,
//     maxLength: 100,
//     trim: true
//   },
//   description: {
//     type: String,
//     required: true,
//     maxLength: 100000,
//     trim: true
//   },
//   price: {
//     type: Number,
//     required: true,
//     maxLength: 255,
//     trim: true
//   },
//   brand: {
//     type: String, 
//     enum: ['Fender', 'Gibson', 'Epiphone', 'Squier'],
//     required: true
//   },
//   amount: {
//     type: Number,
//     required: true,
//     maxLength: 100000
//   },
//   images: {
//     type: Array,
//     default: []
//   }
// }); 


// const Product = mongoose.model('Product', productSchema);
// module.exports = { Product };