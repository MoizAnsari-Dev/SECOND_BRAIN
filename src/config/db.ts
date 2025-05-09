import mongoose from "mongoose";
const db = async () => {
  await mongoose
    .connect("mongodb://localhost:27017/SecondBrain")
    .then(() => {
      console.log("Connected to the DB");
    })
    .catch((e) => {
      console.log(`Error: ${e}`);
    });
};

export { db };
