
const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  productName: {
    type: String,
    required: [true, 'Please enter an email'],
    unique: true,
    lowercase: true,
  
  },
  sellerId: {
    type: String,
    required: true,
  
  },
  cost:{
    type:Number,
    required:true
    
  },
  amountAvailable:{
    type:String,

  }
});



const Product = mongoose.model('product', productSchema);

module.exports = Product;