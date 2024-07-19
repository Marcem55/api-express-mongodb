import jwt from "jsonwebtoken";
import "dotenv/config";

export const verifyToken = (req, res, next) => {
  const token = req.get("Authorization");
  jwt.verify(token, process.env.SECRET_KEY, (error, decoded) => {
    if (error) {
      return res.status(401).json(error);
    }
    req.user = decoded.data;
    // res.send(token);
    next();
  });
};
