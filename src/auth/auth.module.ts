import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from 'src/users/users.module';
import { AuthService } from './auth.service';
import { LocalStrategy } from './local.strategy';
//import { SessionSerializer } from './session.serializer';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';

@Module({
  // imports: [UsersModule, PassportModule.register({ session: true })],
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.register({
      // secret: `${process.env.JWT_SECRET}`,
      secret: 'secret',
      signOptions: { expiresIn: '1h' },
    }),
  ],
  // providers: [AuthService, LocalStrategy, SessionSerializer],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
