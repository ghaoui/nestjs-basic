import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

import { User } from './user.model';

@Injectable()
export class UsersService {
  private users: User[];

  constructor(@InjectModel('User') private readonly userModel: Model<User>) {}

  async create(name: string, email: string, password: string) {
    const newUser = new this.userModel({
      name: name,
      email: email,
      password: password,
    });
    const result=  await newUser.save();
    return result;
  }

  findAll() {
    return `This action returns all users`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
