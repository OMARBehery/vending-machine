const User = require("../models/User");
const jwt = require('jsonwebtoken');

// handle errors
const handleErrors = (err) => {
  console.log(err.message, err.code);
  let error = '';

  // incorrect email
  if (err.message === 'incorrect email') {
    error = 'That email is not registered';
  }

  // incorrect password
  if (err.message === 'incorrect password') {
    error = 'That password is incorrect';
  }

  // duplicate email error
  if (err.code === 11000) {
    error = 'that email is already registered';
    return error;
  }

  // validation errors
  if (err.message.includes('user validation failed')) {
    // console.log(err);
    Object.values(err.errors).forEach(({ properties }) => {
      // console.log(val);
      // console.log(properties);
      errors[properties.path] = properties.message;
    });
  }

  return error;
}

// create json web token 
const maxAge = 3 * 24 * 60 * 60;
const createToken = (id) => {
  return jwt.sign({ id }, 'my secret', {
    expiresIn: maxAge
  });
};

// controller actions
module.exports.signup_get = (req, res) => {
  res.send('signup');
}

// module.exports.login_get = (req, res) => {
//   res.send('login');
// }

module.exports.signup_post = async (req, res) => {
  const { email, password,deposit,role } = req.body;
  if(role=="seller"||role=="buyer"){
  try {
  
    const user = await User.create({ email, password ,deposit,role});
    const token = createToken(user._id);
    res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
    res.status(200).json({message: 'success' , data:{user: user._id }});
  }
  catch(err) {
    const error = handleErrors(err);
    res.status(400).json({status:400 ,message:error });
  }
  }else{
    res.status(400).send('enter correct role (seller/buyer)')
  }
}

module.exports.login_post = async (req, res) => {
  const { email, password,deposit,role } = req.body;

  try {
    const user = await User.login(email, password);
    const token = createToken(user._id);
    res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
    res.status(200).json({status:200 ,message: "success" });
  } 
  catch (err) {
    const error = handleErrors(err);
    res.status(400).json({status:400 ,message:error });
  }

}

module.exports.logout_get = (req, res) => {
  res.cookie('jwt', '', { maxAge: 1 });
  res.redirect('/');
}