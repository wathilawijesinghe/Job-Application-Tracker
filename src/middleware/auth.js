import jwt from "jsonwebtoken";

export const auth = (req, res, next) => {
  const header = req.headers.authorization; // "Bearer token"
  if (!header?.startsWith("Bearer ")) return res.status(401).json({ message: "No token" });

  try {
    const token = header.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // { id: ... }
    next();
  } catch {
    res.status(401).json({ message: "Invalid token" });
  }
};
