const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')


module.exports = function (req, res, next) {
   const token = req.header('x-auth-token');
   if (!token) return res.status(401).send("Access denied. No token provided");

   try {
      const decoded = jwt.verify(token, process.env.SECRET_KEY);
      req.user = decoded;
      next()
   }
   catch (error) {
      res.status(404).send('invalid token')
      console.log(error);
   }
}