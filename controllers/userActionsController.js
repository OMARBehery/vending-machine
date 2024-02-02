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
const currentUser = async()=>{
  const token = req.cookie.jwt;
  if(token){
    jwt.verify(token, 'my secret', async (err, decodedToken) => {
      if (err) {
        console.log(err.message);
        res.send('you have to login first');
      } else {
        const user = await User.findById(decodedToken.id);
        return user;
  }
});}else{
  res.send('you are not logged in')
}}



module.exports.buyer_deposit = async(req, res) => {
const {deposit} =req.body;

const user = await currentUser();


  if(deposit==5||deposit==10||deposit==20||deposit==50||deposit||100){
    const userr = await User.findByIdAndUpdate(user.id,{...deposit},{returnOriginal:false});
    res.json({userr})
  }else{
    res.send('enter correct amount (5,10,20,50,100)')
  }



}



module.exports.buyer_reset = async(req, res) => {

  const user = await currentUser();
  if(user.role=='buyer'){
    res.redirect('/deposit');
  }

}

module.exports.buy_get = async(req, res) => {

}

