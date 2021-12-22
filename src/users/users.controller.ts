import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

import { User } from './user.model';
import { hasRoles } from 'src/decorators/roles.decorator';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RolesGuard } from 'src/auth/roles.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {
    console.log(this);
  }

  @Post()
  create(
    @Body('name') name: string,
    @Body('password') password: string,
    @Body('email') email: string,
    @Body('userName') userName: string,
    @Body('role') role: string,
  ) {
    return this.usersService.create(name, password, email, userName, role);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @hasRoles('admin')
  @Get('clients')
  clients() {
    console.log('test');
    return this.usersService.findAll();
    //return 'hamdi';
  }

  @Get()
  findAll() {
    console.log('salut');
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') userName: string) {
    return this.usersService.findOne(userName);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
