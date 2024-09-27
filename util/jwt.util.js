const jwt = require("jsonwebtoken");

const SECRET_KEY = process.env.JWT_KEY;
const generateToken = (id, email, role) => {
  return jwt.sign(
    {
      email: email,
      id: id,
      roles: role,
    },
    SECRET_KEY,
    {
      subject: email,
      expiresIn: "60m",
      algorithm: "HS256",
    }
  );
};

// Middleware to verify token and roles
const verifyTokenAndRole = (requiredRoles) => {
  return (req, res, next) => {
    const token = req.headers["authorization"];

    if (!token) {
      return res.status(403).json({ message: "No token provided" });
    }

    // Verify JWT token
    jwt.verify(token.split(" ")[1], SECRET_KEY, (err, decoded) => {
      if (err) {
        return res.status(401).json({ message: "Invalid Token" });
      }

      // Check if user has the required roles
      if (requiredRoles) {
        const userRoles = decoded.roles;
        console.log(userRoles);

        const hasRole = requiredRoles.some((role) => userRoles.includes(role));

        if (!hasRole) {
          return res
            .status(403)
            .json({ message: "Forbidden: You do not have the required role" });
        }
      }

      // Attach decoded user info to req
      req.user = decoded;
      next();
    });
  };
};

const getUser = async (req) => {
  const token = req.headers["authorization"];

  if (token) {
    const data = await jwt.verify(token.split(" ")[1], SECRET_KEY);
    return data.id;
  } else if (req.headers["session-id"]) {
    return req.headers["session-id"];
  } else {
    return null;
  }
};

module.exports = { generateToken, verifyTokenAndRole, getUser };
