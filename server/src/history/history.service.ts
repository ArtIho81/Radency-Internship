import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { History, HistoryCreationAttributes } from './history.model';


@Injectable()
export class HistoryService {
  constructor(
    @InjectModel(History) private readonly historyRepository: typeof History,
  ) {}

  async createHistoryItem(dto: HistoryCreationAttributes): Promise<History> {
    const historyItem = await this.historyRepository.create(dto);
    return historyItem;
  }

  async getHistory(id: { [key: string]: number }): Promise<History[]> {
    return await this.historyRepository.findAll({ where: id });
  }
}
