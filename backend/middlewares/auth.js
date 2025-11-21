const jwt = require("jsonwebtoken");

function auth(req, res, next) {
  const token = req.header("Authorization")?.split(" ")[1]; 

  if (!token) return res.status(401).json({ message: "Access denied" });

  try {
    const decoded = jwt.verify(token, "MySchool");
    req.user = decoded; 
    next();             
  } catch {
    res.status(400).json({success:false ,message: "Invalid token" });
  }
}

module.exports = auth;
