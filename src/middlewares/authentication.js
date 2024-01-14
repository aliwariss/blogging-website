const jwt = require("jsonwebtoken");
const secretKey = "topSecret";

exports.verifyAdmin = (req, res, next) => {
    const token = req.headers.authorization;

    if(!token) {
        return res.status(400).json({ message: "Unauthorized, provide token!!!" });
    }

    const bearer = token.split(' ');
    
    if(bearer.length !== 2 || bearer[0].toLowerCase() !== "bearer") {
        return res.status(400).json("Invalid token format");
    }
    const tokenValue = bearer[1];

    jwt.verify(tokenValue, secretKey, (err, decoded) => {
        if(err){
            return res.status(400).json("Invalid token!!!");
        } 
        if(decoded.roles.includes("Admin")) {
            req.user = decoded;
            next();
        }
        else{
            return res.status(401).json({result: "Access denied. User is not an Admin!!!"})
        }
    });
};
