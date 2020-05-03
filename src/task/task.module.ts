import { Module } from '@nestjs/common';
import { TaskController } from './task.controller';
import { TaskService } from './task.service';
import { MongooseModule }  from '@nestjs/mongoose';
import { TaskSchema } from './schemas/task.schema';
import { AuthModule } from 'src/auth/auth.module';

@Module({
    controllers: [TaskController],
    providers: [TaskService],
    imports:[
        MongooseModule.forFeature([
            { name:'Task', schema: TaskSchema }
        ]),
        AuthModule
    ]
})
export class TaskModule {}
