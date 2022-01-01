import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { UpdateUserDto } from './dto/update-user.dto';

import { User } from './user.model';

@Injectable()
export class UsersService {
  private users: User[];

  constructor(@InjectModel('User') private readonly userModel: Model<User>) {}

  async create(
    name: string,
    email: string,
    password: string,
    userName: string,
    role: string,
    companyId: string,
  ) {
    const newUser = new this.userModel({
      name: name,
      email: email,
      password: password,
      userName: userName,
      role: role,
      companyId: companyId,
    });
    const result = await newUser.save();
    return result;
  }

  async findAll() {
    console.log('findAll');
    const result = await this.userModel.find({ role: 'client' });
    return result;
  }

  async findOne(userName: string) {
    const result = await this.userModel.findOne({ userName: userName }).lean();

    if (result) {
      return {
        ...result,
        username: result.userName,
      };
    }
    return null;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }

  async findAllCompanies() {
    const result = await this.userModel.find(
      { role: 'owner' },
      { password: 0 },
    );
    return result;
  }
}
