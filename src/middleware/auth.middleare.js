import jwt from "jsonwebtoken";

export const auth = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(403).json({
        message: "access denied",
      });
    }

    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log(decoded);

    req.user = decoded;

    next();
  } catch (error) {
    console.log(error);

    return res.status(400).json({
      message: "invalid token",
    });
  }
};

export const isAdmin = (req, res, next) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({
        message: "access denied",
      });
    }

    next();
  } catch (error) {
    console.log(error);

    return res.status(400).json({
      message: "server error",
    });
  }
};
