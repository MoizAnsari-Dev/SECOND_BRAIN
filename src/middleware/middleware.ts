import { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken'
import { MY_SECRET } from "../config/config";
const middleware = async (req: Request, res: Response, next: NextFunction) => {
  try {
   const header = req.headers["authentication"]
   const decorded = jwt.verify(header as string, MY_SECRET)
   if (decorded) {
    //@ts-ignore
    req.userId = decorded.id
    next()
   } else {
    res.status(401).send("Unauthorized")
   }
  } catch (error) {
    res.status(400).send(error);
  }
};

export { middleware };
