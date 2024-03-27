import {
  Model,
  Column,
  DataType,
  Table,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { List } from '../lists/list.model';
import { Task } from 'src/tasks/task.model';

export interface HistoryCreationAttributes {
  activity: string;
  listId: number;
  taskId?: number;
}

@Table({ tableName: 'history' })
export class History extends Model<History, HistoryCreationAttributes> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({ type: DataType.TEXT, allowNull: false })
  activity: string;

  @ForeignKey(() => List)
  @Column({ type: DataType.INTEGER })
  listId: number;

  @BelongsTo(() => List)
  list: List;

  @ForeignKey(() => Task)
  @Column({ type: DataType.INTEGER, allowNull: true })
  taskId: number;

  @BelongsTo(() => Task)
  task: Task;
}
