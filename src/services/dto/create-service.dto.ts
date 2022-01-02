import * as mongoose from 'mongoose';

export const ServiceSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
});

export class CreateServiceDto {
  name: string;
  price: number;
  user: string;
}
