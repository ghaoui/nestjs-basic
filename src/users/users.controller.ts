import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

import { User } from './user.model';
import { hasRoles } from 'src/decorators/roles.decorator';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RolesGuard } from 'src/auth/roles.guard';
import { CompanyService } from 'src/company/company.service';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly companyService: CompanyService,
  ) {
    console.log(this);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @hasRoles('owner', 'admin')
  @Post()
  async create(
    @Body('name') name: string,
    @Body('password') password: string,
    @Body('email') email: string,
    @Body('userName') userName: string,
    @Body('role') role: string,
    @Body('companyId') companyId: string,
    @Request() req,
  ) {
    let newCompanyId = companyId;
    if (!companyId) {
      const owner = await this.usersService.findOne(req.user.username);
      console.log(owner);
      const company = owner?.companyId;
      newCompanyId = company['_id']?.toString();
    }

    return this.usersService.create(
      name,
      password,
      email,
      userName,
      role,
      newCompanyId,
    );
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @hasRoles('owner')
  @Get('clients')
  async clients(@Request() req) {
    console.log(req.user);
    const owner = await this.usersService.findOne(req.user.username);
    console.log(owner);
    return this.usersService.findAll(owner?.companyId);
    //return 'hamdi';
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @hasRoles('admin')
  @Get('companies')
  getAllCompanies() {
    return this.usersService.findAllCompanies();
  }

  // @Get()
  // findAll() {
  //   console.log('salut');
  //   return this.usersService.findAll();
  // }

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

  @UseGuards(JwtAuthGuard, RolesGuard)
  @hasRoles('admin')
  @Post('company')
  async newCompany(@Body() body) {
    const { companyName, name, password, email, userName, role } = body;
    const company = await this.companyService.create({ name: companyName });
    console.log(company, 'company');
    return this.usersService.create(
      name,
      password,
      email,
      userName,
      role,
      company._id,
    );
  }
}
