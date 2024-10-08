const jwt = require('jsonwebtoken');

const requireAuth = (req, res, next) => {
  const token = req.cookies.jwt;

  // check json web token exists & is verified
  if (token) {
    jwt.verify(token, 'my secret', (err, decodedToken) => {
      if (err) {
        console.log(err.message);
        res.status(401).send('unauthoraized ');
      } else {
        console.log(decodedToken);
        next();
      }
    });
  } else {
    // res.redirect('/login');
    res.status(401).send('unauthoraized');
  }
};

module.exports = { requireAuth };



