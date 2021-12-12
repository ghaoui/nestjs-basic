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
  ) {
    const newUser = new this.userModel({
      name: name,
      email: email,
      password: password,
      userName: userName,
    });
    const result = await newUser.save();
    return result;
  }

  findAll() {
    return `This action returns all users`;
  }

  async findOne(userName: string) {
    const result = await this.userModel.findOne({ userName: userName }).exec();
    if (result)
      return {
        ...result,
        _id: result._id.toString(),
        username: result.userName,
        role: result.role,
      };
    return null;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
