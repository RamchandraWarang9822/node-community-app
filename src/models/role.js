import mongoose from 'mongoose';
import { Snowflake } from "@theinternetfolks/snowflake";

const roleSchema = new mongoose.Schema({
  _id: { type: String, default: Snowflake.generate(), index: true },
  name: { type: String, required: true, unique: true, maxlength: 64 },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now }
});

const Role = mongoose.model('Role', roleSchema);

export default Role;
