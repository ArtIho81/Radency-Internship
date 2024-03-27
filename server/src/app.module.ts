import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { config, dbConfig } from './configuration/configuration';
import { SequelizeModule } from '@nestjs/sequelize';
import { ListsModule } from './lists/lists.module';
import { AppService } from './app.service';
import { TasksModule } from 'src/tasks/tasks.module'
import { HistoryModule } from './history/history.module';

@Module({
  imports: [
    ConfigModule.forRoot(config),
    SequelizeModule.forRootAsync(dbConfig),
    ListsModule,
    TasksModule,
    HistoryModule,
  ],

  controllers: [],
  providers: [AppService],
})
export class AppModule {}
