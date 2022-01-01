import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  userName: { type: String, required: true },
  role: { type: String, required: true },
  companyId: { type: String },
});

export interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  userName: string;
  role: string;
}
