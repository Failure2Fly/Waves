const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const aggregatePaginate = require('mongoose-aggregate-paginate-v2');


const productSchema = mongoose.Schema({ 
  model: {
    type: String,
    required: [true, 'Please enter a model name'],
    unique: true,
    maxLength: 100,
    trim: true
  },
  description: {
    type: String,
    required: [true, 'You need a description'],
    maxLength: 100000,
    trim: true
  },
  price: {
    type: Number,
    required: true,
    maxLength: 255,
    trim: true
  },
  brand: {
    type: Schema.Types.ObjectId,
    ref: 'Brand',
    required: true
  },
  frets: {
    type: Number,
    required: true
  },
  woodType: {
    type: String,
    required: true,
    maxLength: 100,
    trim: true
  },
  available: {
    type: Number,
    required: [true, 'How many of this model we own'],
    maxLength: 100000,
    default: 0
  },
  itemSold: {
    type: Number,
    maxLength: 100000,
    default: 0
  },
  freeShipping: {
    type: Boolean,
    required: [true, 'Specify if this product has free shipping'],
  },
  images: {
    type: Array,
    default: []
  },
  date: {
    type: Date,
    default: Date.now
  }
}); 




// {
//   "model": "Telecaster",
//   "description": "This is the content of the post",
//   "price": 239,
//   "brand": "",
//   "frets": 22,
//   "woodType": "Mahogany",
//   "available": 23,
//   "itemSold": 2,
//   "freeShipping": true
// }


// {
//     "model":"Jet bt gold",
//     "brand":"6049a1ad9c9a2615b86c04f2",
//     "frets":22,
//     "woodtype":"Mahogany",
//     "description":"This is the content of the post",
//     "price":239,
//     "available":19,
//     "itemsSold":10,
//     "shipping":true
// }


productSchema.plugin(aggregatePaginate);

const Product = mongoose.model('Product', productSchema);
module.exports = { Product };