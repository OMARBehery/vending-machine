const Product = require("../models/Products");

const User = require("../models/User");
const jwt = require('jsonwebtoken');

//checkrole

// const checkRole=(id)=>{
//   const token =req.cookie.jwt;
//   if (token) {
//     jwt.verify(token, 'my secret', (err, decodedToken) => {
//       if (err) {
//         console.log(err.message);
//         res.send('you have to login first');
//       } else {
//         if(decodedToken.id==id){
//           return true;
//         }else{
//           return false;
//         }
        
//       }
//     });
//   } else {
//     // res.redirect('/login');
//     res.send('you have to login first');
//   }
//   }


  // check the current user 
  const currentUser = async(token)=>{
    let returnedToken = ""
    if(token){
        jwt.verify(token, 'my secret',  async (err, decodedToken) => {
        if (err) {
          console.log(err.message);
          res.send('unauthorized');
  
        } else {
          console.log("decoded token >>>> " , decodedToken)
          returnedToken = decodedToken
    }
  })
  }
    else{
    res.send('unauthorized')
  }
  return returnedToken
  }



module.exports.buyer_deposit = async(req, res) => {
const {deposit,email} =req.body;
usernew=req.body
const id=req.body._id
const token = req.cookies.jwt;
const role=req.body.role;

if(role=="buyer"){
const user = currentUser(token).then(result=>{  if(deposit==5||deposit==10||deposit==20||deposit==50||deposit==100){
  User.findOneAndUpdate({"email":email},{$inc:{"deposit":req.body.deposit}},{returnOriginal:false,projection:{"email":1,"deposit":1}}).then
  (result=>{  res.json({"status":200,"data":{"user":result}})})

}else{
  res.send('enter correct amount (5,10,20,50,100)')
}

})



}

}



module.exports.buyer_reset = async(req, res) => {
  const {deposit,email} =req.body;
  usernew=req.body
  const id=req.body._id
  const token = req.cookies.jwt;
  const user = currentUser(token);
  if(user.role=='buyer'){

const user = currentUser(token).then(result=>{  if(deposit==5||deposit==10||deposit==20||deposit==50||deposit==100){
  User.findOneAndUpdate({"email":email},{$set:{"deposit":"0"}},{returnOriginal:false,projection:{"email":1,"deposit":1}}).then
  (result=>{  res.json({"status":200,"data":{"user":result}})})

}else{
  res.send('you are not a buyer')
}
})



  }

}

module.exports.buy_get = async(req, res) => {
const {productId,productAmount}=req.body;

//check role
const id=req.body._id
const token = req.cookies.jwt;
const decodedToken = await currentUser(token);
const user =  await User.findById(decodedToken.id);
console.log("user",user);
if(user.role=='buyer'){
  try{  
    const product=await Product.findById(productId)
    console.log("here",product);
    if(product._id==productId && product.amountAvailable>=productAmount){
      const total_cost=productAmount*product.cost
      const remaining_prod=product.amountAvailable-productAmount
      const change= user.deposit-total_cost
      if(user.deposit>=total_cost){
        Product.findOneAndUpdate({"_id":product.id},{$set:{"amountAvailable":remaining_prod}},{returnOriginal:false,projection:{"product._id":1,"amountAvailable":1}})
        .then(result=>{
          User.findOneAndUpdate({"email":user.email},{$set:{"deposit":change}},{returnOriginal:false,projection:{"email":1,"deposit":1}}).then
          (result=>{  res.json({"status":200,"data":{"user":result}})})
        })
      }else{
        res.send('no enough deposit')
      }
    }
  }
    catch(err){
      console.log(err);
    }

}else{
  res.send('no enough products')
}
//check product amount and cost
//check buyer deposite amount 
//dec. prod. amount
//dec. deposite from buyer
//update deposit with the change 
//respond with the remaining deposit(change )






}


// module.exports. = async(req, res) => {

// }
