import { Controller, Get, Param } from '@nestjs/common';
import { HistoryService } from './history.service';
import { ParseIdPipe } from 'src/pipes/parse-id.pipe';
import { ApiTags, ApiExtraModels } from '@nestjs/swagger';
import { History } from './history.model';

@Controller('history')
@ApiTags('History')
@ApiExtraModels(History)
export class HistoryController {
  constructor(private readonly historyService: HistoryService) {}

  @Get('list/:id')
  getListHistory(@Param('id', ParseIdPipe) id: number) {
    return this.historyService.getHistory({ listId: id });
  }

  @Get('task/:id')
  getTaskHistory(@Param('id', ParseIdPipe) id: number) {
    return this.historyService.getHistory({ taskId: id });
  }
}
