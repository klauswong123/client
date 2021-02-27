const jwt = require('jsonwebtoken');
const secret = 'hardtodecode123';

const withAuth = function(req, res) {
  const token =
      req.body.token ||
      req.query.token ||
      req.headers['x-access-token'] ||
      req.cookies.token;
  if (!token) {
    res.status(401).send('Unauthorized: No token provided');
    return false
  } else {
    jwt.verify(token, secret, function(err, decoded) {
      if (err) {
        res.status(401).send('Unauthorized: Invalid token');
        return false
      } else {
        res.status(200).send('Success');
        req.email = decoded.email;
        return true
      }
    });
  }
}

module.exports = withAuth;
