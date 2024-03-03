const jwt = require('jsonwebtoken');
const SECRET_KEY = process.env.MY_SECRET; // Certifique-se de ter definido esta variável de ambiente

const verifyToken = (req, res, next) => {
  const token = req.headers['authorization'] ? req.headers['authorization'].split(' ')[1] : null;

  if (!token) {
    return res.status(403).send({ message: "A token is required for authentication" });
  }

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    req.user = decoded;
  } catch (err) {
    return res.status(401).send({ message: "Invalid Token" });
  }
  return next();
};

module.exports = verifyToken;
