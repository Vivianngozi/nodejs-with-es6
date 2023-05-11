import jwt from "jsonwebtoken";

export async function  jwtValidator(req, res, next){
  const token = req.header('Authorization').split('Bearer ')[1]
  if (!token) return res.status(401).json({ message: "Invalid token" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.user;
    next();
  } catch (e) {
    console.error(e);
    res.status(500).send({ message: "Invalid Token" });
  }
}

