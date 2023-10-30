import mongoose from 'mongoose';
import { Snowflake } from "@theinternetfolks/snowflake";

const communitySchema = new mongoose.Schema({
  _id: { type: String, default: Snowflake.generate(), index: true },
  name: { type: String, required: true, maxlength: 128 },
  slug: { type: String, required: true, unique: true, maxlength: 255 },
  owner: { type: String, required: true, ref: 'User' }, // Assuming 'User' is the model name for the owner
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now }
});

const Community = mongoose.model('Community', communitySchema);

export default Community;
