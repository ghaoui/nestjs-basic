import * as mongoose from 'mongoose';

export const CompanySchema = new mongoose.Schema({
  name: { type: String, required: true },
});

export interface Company {
  name: string;
}
