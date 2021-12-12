import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private usersService: UsersService) {
    super(
      {
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        ignoreExpiration: false,
        // secretOrKey: `${process.env.JWT_SECRET}`,
        secretOrKey: 'secret',
      },
      // async (payload, done) => {
      //   try {
      //     // Find user by id in payload
      //     console.log(payload, 'payload');
      //     const user = await this.usersService.findOne(payload.sub);
      //     // If user doesn't exist, return error
      //     if (!user) {
      //       return done(null, false);
      //     }
      //     // Otherwise, return user
      //     done(null, user);
      //   } catch (error) {
      //     done(error, false);
      //   }
      // },
    );
  }

  // Method to extract user from request
  async validate(payload: any) {
    return {
      id: payload.sub,
      username: payload.username,
    };
  }
}
