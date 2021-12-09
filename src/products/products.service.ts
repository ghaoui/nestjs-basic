import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './product.model';

@Injectable()
export class ProductsService {
  private products: Product[];

  constructor(@InjectModel('Product') private readonly productModel: Model<Product>) {}
  async create(name: string, quantity: number, price: number) {
    const newUser = new this.productModel({
      name,
      quantity,
      price
    });
    const result = await newUser.save();
    return result;
  }

  findAll() {
    return this.productModel.find().exec();
  }

  async findOne(id: string) {
    return await this.productModel.findById(id);
  }

  async update(id: string, name: string, quantity: number, price: number) {
    const result = await this.productModel.updateOne({ _id: id }, { name, quantity, price });
    return result;
    //return `This action updates a #${id} product`;
  }

  async remove(id: string) {
    const result = await this.productModel.deleteOne({ _id: id });
    return result;
  }
}
