import mongoose from "mongoose";
import { Snowflake } from "@theinternetfolks/snowflake";

const userSchema = new mongoose.Schema({
  _id: { type: String, default: Snowflake.generate(), index: true },
  name: { type: String, default: null },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  created_at: { type: Date, default: Date.now },
});

const User = mongoose.model("User", userSchema);

export default User;
