import jwt from "jsonwebtoken";
import { promisify } from "util";
import authConfig from "../config/auth";

export default async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    // Token not provided.
    return res.status(401).json({ error: "Access denied." });
  }

  const [, token] = authHeader.split(" ");

  try {
    const decoded = await promisify(jwt.verify)(token, authConfig.secret);
    req.userId = decoded.id;
    return next();
  } catch (error) {
    // Invalid Token.
    return res.status(401).json({ error: "Access denied." });
  }
};
