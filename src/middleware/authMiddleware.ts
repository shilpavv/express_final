const jwt = require('jsonwebtoken');
export function verifyToken(req:any, res:any, next:any) {
    const token = req.headers.authorization;
    if (!token) {
      return res.status(401).send('Unauthorized');
    }
    const secretKey = "@SEIJIVS";
    jwt.verify(token.replace('Bearer ', ''), secretKey, (err:any, decoded:any) => {
      if (err) {
        return res.status(401).send('Invalid token');
      }
      req.user = decoded; 
      next();
    });
  }

