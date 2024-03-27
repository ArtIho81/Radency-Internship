import { Module } from '@nestjs/common';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Task } from './task.model';
import { List } from 'src/lists/list.model';
import { ListsModule } from 'src/lists/lists.module';
import { History } from 'src/history/history.model';
import { HistoryModule } from 'src/history/history.module';

@Module({
  imports: [
    SequelizeModule.forFeature([Task, List, History]),
    ListsModule,
    HistoryModule,
  ],
  controllers: [TasksController],
  providers: [TasksService],
})
export class TasksModule {}
