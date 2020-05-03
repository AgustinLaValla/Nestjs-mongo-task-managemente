import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TaskModule } from './task/task.module';
import { MongooseModule } from '@nestjs/mongoose';
import { DB_URI } from './config/db.config';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    TaskModule, 
    MongooseModule.forRoot(DB_URI, {useNewUrlParser:true, useUnifiedTopology:true, useCreateIndex:true}), 
    AuthModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
