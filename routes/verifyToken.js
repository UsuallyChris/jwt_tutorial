const jwt = require('jsonwebtoken');

function auth(req, res, next) {
  const token = req.header('auth-token');

  // check to see if jwt is there
  if(!token) {
    return res.status(401).send('Accessed denied');
  }

  try {
    const verified = jwt.verify(token, process.env.TOKEN_SECRET);
    req.user = verified; 
  } catch(err) {
    res.status(400).send('Invalid token');
  }
}