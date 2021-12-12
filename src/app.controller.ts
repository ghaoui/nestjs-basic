import { Controller, Get, Post, UseGuards, Request } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthService } from './auth/auth.service';
import { AuthenticatedGuard } from './auth/authenticated.guard';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { LocalAuthGuard } from './auth/local-auth.guard';
import { RolesGuard } from './auth/roles.guard';
import { hasRoles } from './decorators/roles.decorator';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private authService: AuthService,
  ) {}

  //@UseGuards(AuthenticatedGuard)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @hasRoles('admin')
  @Get('protected')
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('/login')
  @UseGuards(LocalAuthGuard)
  login(@Request() req): any {
    return this.authService.login({
      username: req.user.username,
      id: req.user.id,
    });
  }
}
