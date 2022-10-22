import jwt from "jsonwebtoken";
import { secretKey } from "../controller/auth.controller";

export const auth = (req, res, next) => {
  let authorization = req.headers.authorization;
  if (authorization) {
    let accesstoken = authorization.spit(" ")[1];
    if (!accesstoken) {
      res.status(401).json({
        message: "Unauthorization",
      });
    } else {
      jwt.verify(accesstoken, secretKey, (err, data) => {
        if (err) {
          res.status(401).json({
            error: err.message,
            message: "Unauthorization",
          });
        } else {
          req.decoded = data;
          next();
        }
      });
    }
  }else{
    res.status(401).json({
        message: "Unauthorization",
      });
  }
};
