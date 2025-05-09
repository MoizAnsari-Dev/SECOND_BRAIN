import express from "express";
import dotenv from "dotenv";
import { db } from "./config/db";
import bcrypt from "bcrypt";
import { modelUser } from "./model/userModel";
import mongoose from "mongoose";

const app = express();
app.use(express.json());
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
    const {email, password} = req.body;
    const user = await modelUser.findOne({email: email});
    if (!user) {
        throw new Error("Email can not found");
    }
    const passwordValidaton = await bcrypt.compare(password, user.password);
    if (!passwordValidaton) {
        throw new Error("Password is incorret please try again");
    }
    res.send("you are loggedin");
  } catch (error) {
    res.status(400).send("Error: " + error);
  }
});
app.get("/user/contain", (req, res) => {
  try {
    res.send("Comming from Contains");
  } catch (error) {
    res.status(400).send("Error: " + error);
  }
});
app.delete("/user/containdelete", (req, res) => {
  try {
    res.send("Comming from delete Contains");
  } catch (error) {
    res.status(400).send("Error: " + error);
  }
});

app.get('/demo', (req, res) => {
  console.log(req.headers);
  res.send('Check the console for headers');
});


app.listen(3000, async () => {
  await db();
  console.log("Server is Live");
});
