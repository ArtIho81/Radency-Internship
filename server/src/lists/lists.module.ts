import { Module } from '@nestjs/common';
import { ListsController } from './lists.controller';
import { ListsService } from './lists.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { List } from './list.model';
import { HistoryModule } from 'src/history/history.module';

@Module({
  imports: [SequelizeModule.forFeature([List]), HistoryModule],
  controllers: [ListsController],
  providers: [ListsService],
  exports: [ListsService],
})
export class ListsModule {}
