import {
  IsEnum,
  IsDateString,
  IsString,
  IsNotEmpty,
  IsNumber,
} from 'class-validator';
import { Priority, Status } from '../tasks.types';
import { TaskCreationAttributes } from '../task.model';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTaskDto implements TaskCreationAttributes {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: 'Sprint Planning',
    description: 'The name of the Task',
  })
  readonly name: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: 'About Task', description: 'About' })
  readonly desc: string;

  @IsEnum(Priority)
  @ApiProperty({ example: 'Medium', description: 'Low | Medium | High' })
  readonly priority: string;

  @IsEnum(Status)
  @ApiProperty({
    example: 'In Process',
    description: 'To Do | Planned | In Process | Closed',
  })
  readonly status: string;

  @IsNotEmpty()
  @IsDateString()
  @ApiProperty({example: '2024-03-27 18:18:35.358+02', description: 'Due date'})
  readonly time: string;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({example: '1', description: 'Id of TaskList'})
  readonly listId: number;
}
