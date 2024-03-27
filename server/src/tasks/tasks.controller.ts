import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { ParseIdPipe } from 'src/pipes/parse-id.pipe';
import { UpdateTaskDto } from './dto/update-task.dto';
import {
  ApiTags,
  ApiExtraModels,
  ApiOperation,
  ApiResponse,
} from '@nestjs/swagger';
import { Task } from './task.model';

@Controller('tasks')
@ApiTags('Task')
@ApiExtraModels(Task)
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Post()
  @ApiOperation({ summary: 'create new task' })
  @ApiResponse({ status: 200, type: Task })
  create(@Body() createTaskDto: CreateTaskDto) {
    return this.tasksService.createNewTask(createTaskDto);
  }

  @Get()
  @ApiOperation({ summary: 'get all tasks' })
  @ApiResponse({ status: 200, type: [Task] })
  getAll() {
    return this.tasksService.getAllTasks();
  }

  @Get(':id')
  @ApiOperation({ summary: 'get the task' })
  @ApiResponse({ status: 200, type: Task })
  getById(@Param('id', ParseIdPipe) id: number) {
    return this.tasksService.getTaskById(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'update the task' })
  @ApiResponse({ status: 200, type: Task })
  update(
    @Param('id', ParseIdPipe) id: number,
    @Body() updateTaskDto: UpdateTaskDto,
  ) {
    return this.tasksService.editTask(id, updateTaskDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'delete the task' })
  delete(@Param('id', ParseIdPipe) id: number) {}
}
