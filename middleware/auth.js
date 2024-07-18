//this is for allowing a valid user to update info
import jwt from "jsonwebtoken";
// import ENV from "../config.js";
import dotenv from "dotenv";

dotenv.config();
// auth middleware
export default async function Auth(req, res, next) {
  try {
    //access authorize header to validate
    const token = req.headers.authorization.split(" ")[1];
    /**
     * ! Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NjUyY2QyM2U0MmVkM2I3YWFmMTExNWUiLCJ1c2VybmFtZSI6ImV4YW1wbGUxMjMiLCJpYXQiOjE3MTY3MDI1MDEsImV4cCI6MTcxNjc4ODkwMX0.cBxiy5Lj3KLN_y_sctfg1yfZXwbigQOT6BUXEh5roCw
     * ? The above is a sample token
     * TODO to remove the bearer and get token we used split(" ")[1]
     */
    // retrieve the user details for logged in users

    const decodedToken = await jwt.verify(token, process.env.JWT_SECRET);

    req.user = decodedToken;

    next();
  } catch (error) {
    res.status(401).json({ error: "Authentication Failed!" });
  }
}

export function localVariables(req, res, next) {
  req.app.locals = {
    OTP: null,
    resetSession: false,
  };
  next();
}
