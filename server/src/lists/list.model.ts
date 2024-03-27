import { Model, Column, DataType, Table, HasMany } from 'sequelize-typescript';
import { History } from 'src/history/history.model';
import { Task } from 'src/tasks/task.model';
import { ApiProperty } from '@nestjs/swagger';

interface ListCreationAttributes {
  name: string;
}

@Table({ tableName: 'lists' })
export class List extends Model<List, ListCreationAttributes> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  @ApiProperty({ example: '1', description: 'identificator' })
  id: number;

  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  @ApiProperty({ example: 'MyTaskBoard', description: 'TaskList name' })
  name: string;

  @HasMany(() => Task)
  tasks: Task[];

  @HasMany(() => History)
  history: History[];
}
