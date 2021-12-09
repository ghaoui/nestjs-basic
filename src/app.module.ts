import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import {MongooseModule} from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { ProductsModule } from './products/products.module';

@Module({
  imports: [ConfigModule.forRoot(),UsersModule,MongooseModule.forRoot(process.env.MONGODB_URL), ProductsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
