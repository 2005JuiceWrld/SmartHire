import JWT from "jsonwebtoken";
import Users from "../models/userModel.js";

const isAdmin = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Authentication failed" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const userToken = JWT.verify(token, process.env.JWT_SECRET_KEY);
    
    // Fetch user to verify role
    const user = await Users.findById(userToken.userId);

    if (!user || user.role !== "admin") {
      return res.status(403).json({ message: "Unauthorized! Admin access only." });
    }

    req.body.user = {
      userId: userToken.userId,
      role: user.role
    };
    
    req.user = user;

    next();
  } catch (error) {
    console.error("Admin Authentication failed:", error.message);
    return res.status(401).json({ message: "Authentication failed" });
  }
};

export default isAdmin;
