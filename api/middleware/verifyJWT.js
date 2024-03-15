import jwt from 'jsonwebtoken';
export const verifyJWT = (req, res, next) => {
  const token = req.headers?.authorization;
  if (!token) return res.status(401).json({ message: 'Unauthorized' });
  const accessToken = token.split(' ')[1];

  jwt.verify(accessToken, process.env.ACCESS_TOKEN, (err, decoded) => {
    if (err) return res.status(403).json({ message: 'forbidden' });
    req.currentUser = decoded;
    next();
  });
};
