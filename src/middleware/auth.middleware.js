import jwt from "jsonwebtoken";
import { secretKey } from "../controller/auth.controller";


class AuthMiddleware {
  verifyToken = (req, res, next) => {
    let Authorization = req.headers.authorization;
    if (Authorization) {
      let accesstoken = Authorization.split(" ")[1];
      if (!accesstoken) {
        res.status(401).json({
          message: "Unauthorization(2)",
        });
      } else {
        jwt.verify(accesstoken, secretKey, (err, data) => {
          if (err) {
            res.status(401).json({
              error: err.message,
              message: "Unauthorization(1)",
            });
          } else {
            req.decoded = data;
            if(req.decoded.admin === true){
              next();
            }else{
              res.status(401).json({
                message: "Unauthorization(3)"
              })
            }
            
          }
        });
      }
    }else{
      res.status(401).json({
          message: "Unauthenticated(2)",
        });
    }
  };
}

export default AuthMiddleware;

