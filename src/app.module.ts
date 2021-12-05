import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import {MongooseModule} from '@nestjs/mongoose';

@Module({
  imports: [UsersModule,MongooseModule.forRoot('mongodb+srv://admin:admin@ghaoui.vuvds.mongodb.net/myFirstDatabase?retryWrites=true&w=majority')],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
