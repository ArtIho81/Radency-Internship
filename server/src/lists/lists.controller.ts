import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ListsService } from './lists.service';
import { CreateListDto } from './dto/create-list.dto';
import { ParseIdPipe } from 'src/pipes/parse-id.pipe';
import {
  ApiTags,
  ApiExtraModels,
  ApiOperation,
  ApiResponse,
} from '@nestjs/swagger';
import { List } from './list.model';

@Controller('lists')
@ApiTags('List')
@ApiExtraModels(List)
export class ListsController {
  constructor(private listsService: ListsService) {}

  @Get()
  @ApiOperation({ summary: 'get all lists' })
  @ApiResponse({ status: 200, type: [List] })
  getAll() {
    return this.listsService.getAllLists();
  }

  @Get(':id')
  @ApiOperation({ summary: 'get the list' })
  @ApiResponse({ status: 200, type: List })
  getById(@Param('id', ParseIdPipe) id: number) {
    return this.listsService.getListById(id);
  }

  @Post()
  @ApiOperation({ summary: 'create new list' })
  @ApiResponse({ status: 200, type: List })
  create(@Body() listDto: CreateListDto) {
    return this.listsService.createNewList(listDto);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'update the list' })
  @ApiResponse({ status: 200, type: List })
  update(@Param('id', ParseIdPipe) id: number, @Body() listDto: CreateListDto) {
    return this.listsService.renameList(id, listDto.name);
  }

  @Delete(':id')
  delete(@Param('id', ParseIdPipe) id: number) {
    return this.listsService.deleteList(id);
  }
}
