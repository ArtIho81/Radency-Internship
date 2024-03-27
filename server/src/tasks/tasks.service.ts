import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Task } from './task.model';
import { InjectModel } from '@nestjs/sequelize';
import { CreateTaskDto } from './dto/create-task.dto';
import { Edit, ListsService } from 'src/lists/lists.service';
import { UpdateTaskDto } from './dto/update-task.dto';
import { HistoryService } from 'src/history/history.service';

enum TaskActivityTittle {
  CREATE_TASK = 'create new task',
  EDIT_TASK = 'edit task',
  DELETE_TASK = 'delete task',
}

interface TaskActivity {
  title: TaskActivityTittle;
  list: string;
  name?: string | Edit;
  desc?: Edit;
  time?: Edit;
  status?: string | Edit;
}

@Injectable()
export class TasksService {
  constructor(
    @InjectModel(Task) private readonly tasksRepository: typeof Task,
    private readonly listsService: ListsService,
    private readonly historyService: HistoryService,
  ) {}

  async createNewTask(dto: CreateTaskDto): Promise<Task> {
    const { name, listId } = dto;
    const [task, created] = await this.tasksRepository.findOrCreate({
      where: { name, listId },
      defaults: { ...dto },
    });
    if (!created) {
      throw new BadRequestException(`Task ${task.name} is already exist`);
    }
    const list = await this.listsService.getListById(listId);
    const activity: TaskActivity = {
      title: TaskActivityTittle.CREATE_TASK,
      name,
      list: list.name,
    };
    await this.historyService.createHistoryItem({
      activity: JSON.stringify(activity),
      listId,
      taskId: task.id,
    });
    return task;
  }

  async editTask(id: number, dto: UpdateTaskDto): Promise<Task> {
    const task = await this.getTaskById(id);
    const editedValues = Object.keys(dto).filter((key) => {
      if (key === 'time') {
        key = new Date(key).toLocaleString();
      }
      return dto[key] !== task[key];
    });

    if (!editedValues.length) {
      throw new BadRequestException(`${task.name} has no values to update`);
    }

    const list = await this.listsService.getListById(task.listId);

    const activity: TaskActivity = {
      title: TaskActivityTittle.EDIT_TASK,
      list: list.name,
    };

    editedValues.forEach((key) => {
      activity[key] = { from: task[key], to: dto[key] };
      task[key] = dto[key];
    });

    await this.historyService.createHistoryItem({
      activity: JSON.stringify(activity),
      listId: task.listId,
      taskId: task.id,
    });

    return await task.save();
  }

  async deleteTask(id: number) {
    const task = await this.getTaskById(id);
    const list = await this.listsService.getListById(task.listId);
    const activity: TaskActivity = {
      title: TaskActivityTittle.DELETE_TASK,
      name: task.name,
      list: list.name,
      status: task.status,
    };
    await this.historyService.createHistoryItem({
      activity: JSON.stringify(activity),
      listId: task.listId,
      taskId: id,
    });
    await task.destroy();
  }

  async getTaskById(id: number): Promise<Task> | null {
    const task = await this.tasksRepository.findByPk(id);
    if (!task) {
      throw new NotFoundException(`Task with id: ${id} not found`);
    }
    return task;
  }

  async getAllTasks(): Promise<Task[]> {
    return await this.tasksRepository.findAll();
  }

  async getTaskByNameWithListName(
    taskName: string,
    listName: string,
  ): Promise<Task> | null {
    const list = await this.listsService.getListByName(listName);
    return await this.tasksRepository.findOne({
      where: { name: taskName, listId: list.id },
    });
  }
}
