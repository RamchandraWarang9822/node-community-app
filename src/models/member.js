import mongoose from 'mongoose';
import { Snowflake } from "@theinternetfolks/snowflake";

const memberSchema = new mongoose.Schema({
  _id: { type: String, default: Snowflake.generate(), index: true },
  community: { type: String, required: true, ref: 'Community' }, // Assuming 'Community' is the model name for communities
  user: { type: String, required: true, ref: 'User' }, // Assuming 'User' is the model name for users
  role: { type: String, required: true, ref: 'Role' }, // Assuming 'Role' is the model name for roles
  created_at: { type: Date, default: Date.now }
});

const Member = mongoose.model('Member', memberSchema);

export default Member;
