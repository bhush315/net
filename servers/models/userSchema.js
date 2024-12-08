import mongoose from "mongoose";

const driver = mongoose.Schema;

const users = new driver({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

const userModel = mongoose.model("member", users);
export default userModel;
