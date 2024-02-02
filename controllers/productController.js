const Product = require("../models/Products");

const User = require("../models/User");
const jwt = require('jsonwebtoken');



//checkrole

const checkRole=(id)=>{
const token =req.cookie.jwt;
if (token) {
  jwt.verify(token, 'my secret', (err, decodedToken) => {
    if (err) {
      console.log(err.message);
      res.send('you have to login first');
    } else {
      if(decodedToken.id==id){
        return true;
      }else{
        return false;
      }
      
    }
  });
} else {
  // res.redirect('/login');
  res.send('you have to login first');
}
}

// controller actions
module.exports.allproduct_get = (req, res) => {
  Product.find().sort({ createdAt: -1 })
  .then(result => {
    res.status(200).json({result});
    // res.send(result)
  })
  .catch(err => {
    console.log(err);
  });
}
module.exports.singleproduct_get = (req, res) => {
  const id = req.params.id;
  product.findById(id)
    .then(product => {
      res.status(200).json({product});
    })
    .catch(err => {
      console.log(err);
      res.status(404).json({err});
    });
}


module.exports.product_post = async(req, res) => {
  const id = req.params.id;
  const {sellerId}=req.body;
  const seller =await checkRole(sellerId)
  if(seller){
    const product = new Product(req.body);
    product.save()
      .then(result => {
        // res.redirect('/blogs');
        res.send(result)
      })
      .catch(err => {
        console.log(err);
      });
  }
}

module.exports.product_put = async (req, res) => {
  const { sellerId , productName} = req.body;
  const seller=await checkRole(sellerId);
if(seller){
  try {
    const product = await Product.findOneAndUpdate({sellerId, productName},req.body,{returnOriginal:false});
     res.status(201).json({product });
  }
  catch(err) {
    
    res.status(400).json({ err });
  }
 
}else{
  res.send('you cannot update product as you are not the seller ')
}
}

module.exports.product_delete = async (req, res) => {
  const id = req.params.id;
  const {sellerId}=req.body;
  const seller =await checkRole(sellerId)
  if(seller){
  Product.findByIdAndDelete(id)
    .then(result => {
      res.send('product deleted');
    })
    .catch(err => {
      console.log(err);
    });

}
else{
  res.send('you cannot delete product as you are not the seller of that product')
}}

