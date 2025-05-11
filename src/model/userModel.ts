import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
      min: 18,
    },
  },
  {
    timestamps: true,
  }
);
const modelUser = mongoose.model("User", userSchema);

const ContainSchema = new mongoose.Schema({
  title: String,
  link: String,
  tags: [{ type: mongoose.Types.ObjectId, ref: "Tag" }],
  userID: { type: mongoose.Types.ObjectId, ref: "User", required: true },
});
const ContainModel = mongoose.model("Contain", ContainSchema);

export { modelUser, ContainModel };
