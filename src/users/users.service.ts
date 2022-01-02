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

  async findAll(companyId: any) {
    //const id = companyId?._id;

    const result = await this.userModel.find({
      role: 'client',
      companyId: companyId?._id,
    });
    return result;
  }

  async findOne(userName: string) {
    const result = await this.userModel
      .findOne({ userName: userName })
      .populate('companyId')
      .lean();

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
    // const result = await this.userModel
    //   .find({ role: 'owner' }, { password: 0 })
    //   .populate('companyId');

    const result = await this.userModel.aggregate([
      { $match: { role: 'owner' } },
      {
        $lookup: {
          from: 'companies',
          localField: 'companyId',
          foreignField: '_id',
          as: 'company',
        },
      },
      {
        $lookup: {
          from: 'users',
          localField: '_id',
          foreignField: 'companyId',
          as: 'users',
        },
      },
      {
        $project: {
          _id: 1,
          name: 1,
          email: 1,
          userName: 1,
          role: 1,
          company: {
            _id: 1,
            name: 1,
          },
        },
      },
    ]);

    return result;
  }
}
