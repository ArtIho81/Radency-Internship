import {
  Model,
  Column,
  DataType,
  Table,
  BelongsTo,
  ForeignKey,
  HasMany,
} from 'sequelize-typescript';
import { History } from 'src/history/history.model';
import { List } from 'src/lists/list.model';
import { ApiProperty } from '@nestjs/swagger';

export interface TaskCreationAttributes {
  name: string;
  desc: string;
  time: string;
  priority: string;
  status: string;
  listId: number;
}

@Table({ tableName: 'tasks' })
export class Task extends Model<Task, TaskCreationAttributes> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  @ApiProperty({ example: '1', description: 'identificator' })
  id: number;

  @Column({ type: DataType.STRING, allowNull: false })
  @ApiProperty({ example: 'Document Review', description: 'Task name' })
  name: string;

  @Column({ type: DataType.TEXT, allowNull: false })
  @ApiProperty({ example: 'About Task', description: 'Task description' })
  desc: string;

  @Column({ type: DataType.DATE, allowNull: false })
  @ApiProperty({
    example: '2024-03-27 18:18:35.358+02',
    description: 'Due date',
  })
  time: string;

  @Column({ type: DataType.STRING, allowNull: false })
  @ApiProperty({ example: 'Low | Medium | High', description: 'Task priority' })
  priority: string;

  @Column({ type: DataType.STRING, allowNull: false })
  @ApiProperty({
    example: 'To Do | Planned | In Progress | Closed',
    description: 'Task Status',
  })
  status: string;

  @ForeignKey(() => List)
  @Column({ type: DataType.INTEGER })
  listId: number;

  @BelongsTo(() => List)
  list: List;

  @HasMany(() => History)
  activities: History[];
}
