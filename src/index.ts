import express, { Request, Response } from "express";
import dotenv from "dotenv";
import { db } from "./config/db";
import bcrypt from "bcrypt";
import { ContainModel, modelUser } from "./model/userModel";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";
import { MY_SECRET } from "./config/config";
import { middleware } from "./middleware/middleware";

const app = express();
app.use(express.json());
app.use(cookieParser());
dotenv.config();

app.post("/user/signup", async (req, res) => {
  try {
    const { firstName, lastName, password, email, age } = req.body;
    const passwordHash = await bcrypt.hash(password, 10);

    const userDataCreate = new modelUser({
      firstName,
      lastName,
      email,
      age,
      password: passwordHash,
    });
    console.log(passwordHash);
    await userDataCreate.save();
    res.send("User successfully registered");
  } catch (error) {
    res.status(400).send("Error: " + error);
  }
});
app.post("/user/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await modelUser.findOne({ email: email });
    if (!user) {
      throw new Error("Email can not found");
    }
    const passwordValidaton = await bcrypt.compare(password, user.password);
    if (!passwordValidaton) {
      throw new Error("Password is incorret please try again");
    }
    if (user) {
      const token = await jwt.sign({ id: user._id }, MY_SECRET, {
        expiresIn: "7D",
      });
      res.json({
        token,
      });
    }
  } catch (error) {
    res.status(400).send("Error: " + error);
  }
});
app.post("/user/contain", middleware, async (req: Request, res: Response) => {
  try {
    const { link, tags, title, userID } = req.body;
    const containDataCreate = new ContainModel({
      link,
      tags,
      title,
      //@ts-ignore
      userID: req.userId
    })
    await containDataCreate.save();
    res.send("Comming from Contains");
  } catch (error) {
    res.status(400).send("Error: " + error);
  }
});
app.get("/user/loadContain", middleware, async (req, res) => {
  //@ts-ignore
  const userID = req.userId
  
  const contain = await ContainModel.find({
    //@ts-ignore
    userId: req.userID
  }).populate("userID", ["firstName", "lastName"])
  console.log(contain);
  res.json({
    contain
  })
})
app.delete("/user/containdelete",  middleware, async (req, res) => {
  try {
    //@ts-ignore
    const containId = req.userId
    await ContainModel.deleteMany({
      containId, 
      //@ts-ignore
      userid: req.userID
    })
    res.json({
      message: 'deleted'
    })
  } catch (error) {
    res.status(400).send("Error: " + error);
  }
});

app.get("/demo", (req, res) => {
  console.log(req.headers);
  res.send("Check the console for headers");
});

app.listen(3000, async () => {
  await db();
  console.log("Server is Live");
});
