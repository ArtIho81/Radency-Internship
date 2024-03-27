import { Module } from '@nestjs/common';
import { HistoryService } from './history.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { History } from './history.model';
import { List } from 'src/lists/list.model';
import { Task } from 'src/tasks/task.model';
import { ListsService } from 'src/lists/lists.service';
import { HistoryController } from './history.controller';

@Module({
  imports: [SequelizeModule.forFeature([History, Task, List])],
  providers: [HistoryService],
  exports: [HistoryService],
  controllers: [HistoryController],
})
export class HistoryModule {}
