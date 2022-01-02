import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';

@Injectable()
export class ServicesService {
  constructor(
    @InjectModel('Service')
    private readonly ServiceModel: Model<CreateServiceDto>,
  ) {}

  async create(createServiceDto: CreateServiceDto) {
    const newService = new this.ServiceModel(createServiceDto);
    const result = await newService.save();
    return result;
  }

  findAll(user) {
    return this.ServiceModel.find({ user });
  }

  findOne(id: number) {
    return `This action returns a #${id} service`;
  }

  update(id: number, updateServiceDto: UpdateServiceDto) {
    return `This action updates a #${id} service`;
  }

  remove(id: number) {
    return `This action removes a #${id} service`;
  }
}
