import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as session from 'express-session';
import * as passport from 'passport';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  // app.use(
  //   session({
  //     secret: process.env.SESSION_SECRET,
  //     resave: false,
  //     saveUninitialized: true,
  //     cookie: { MaxAge: 360000 },
  //   }),
  // );
  // app.use(passport.initialize());
  // app.use(passport.session());

  //await app.listen(3000);
  await app.listen(process.env.PORT || 3000);
}
bootstrap();
