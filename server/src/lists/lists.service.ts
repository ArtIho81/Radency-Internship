import { BadRequestException, Injectable } from '@nestjs/common';
import { List } from './list.model';
import { InjectModel } from '@nestjs/sequelize';
import { CreateListDto } from './dto/create-list.dto';
import { HistoryService } from 'src/history/history.service';

enum ListActivityTittle {
  CREATE_LIST = 'create new list',
  EDIT_LIST = 'edit list',
}

export type Edit = { from: string; to: string };

interface ListActivity {
  title: ListActivityTittle;
  name: string | Edit;
}

@Injectable()
export class ListsService {
  constructor(
    @InjectModel(List) private readonly listsRepository: typeof List,
    private readonly historyService: HistoryService,
  ) {}

  async getListById(id: number) {
    const list = await this.listsRepository.findByPk(id, {
      include: { all: true },
    });
    if (!list) throw new BadRequestException("list wasn't found");
    return list;
  }

  async getListByName(name: string): Promise<List> {
    const list = await this.listsRepository.findOne({
      where: { name },
      include: { all: true },
    });
    if (!list) throw new BadRequestException(`TaskList ${list} wasn't found`);
    return list;
  }

  async createNewList(dto: CreateListDto): Promise<List> {
    const [list, created] = await this.listsRepository.findOrCreate({
      where: { name: dto.name },
      defaults: { ...dto },
    });
    if (!created) {
      throw new BadRequestException(`TaskList ${list.name} is alrady exist`);
    }
    const activity: ListActivity = {
      title: ListActivityTittle.CREATE_LIST,
      name: dto.name,
    };
    await this.historyService.createHistoryItem({
      activity: JSON.stringify(activity),
      listId: list.id,
    });
    return list;
  }

  async renameList(id: number, name: string): Promise<List> {
    const list = await this.getListById(id);
    const activity: ListActivity = {
      title: ListActivityTittle.EDIT_LIST,
      name: { from: list.name, to: name },
    };
    await this.historyService.createHistoryItem({
      activity: JSON.stringify(activity),
      listId: id,
    });
    list.name = name;
    return await list.save();
  }

  async deleteList(id: number) {
    const list = await this.getListById(id);
    await list.destroy();
  }

  async getAllLists() {
    const lists = this.listsRepository.findAll();
    return lists;
  }
}
