import {
  ConfigModule,
  ConfigModuleOptions,
  ConfigService,
} from '@nestjs/config';
import { SequelizeModuleAsyncOptions } from '@nestjs/sequelize';
import { History } from 'src/history/history.model';
import { List } from 'src/lists/list.model';
import { Task } from 'src/tasks/task.model';

const getConfig = () => {
  const { env } = process;
  return {
    port: env.PORT,
    databases: {
      postgres: {
        host: env.POSTGRES_HOST,
        port: env.POSTGRES_PORT,
        user: env.POSTGRES_USER,
        password: env.POSTGRES_PASSWORD,
        db: env.POSTGRES_DB,
      },
    },
  };
};

export const config: ConfigModuleOptions = {
  isGlobal: true,
  load: [getConfig],
};

const allModels = [Task, List, History]

export const dbConfig: SequelizeModuleAsyncOptions = {
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: (configService: ConfigService) => {
    const postgres = configService.get('databases.postgres');
    return {
      dialect: 'postgres',
      host: postgres.host,
      port: postgres.port,
      username: postgres.user,
      password: postgres.password,
      database: postgres.db,
      models: allModels,
      autoLoadModels: true,
    };
  },
};
