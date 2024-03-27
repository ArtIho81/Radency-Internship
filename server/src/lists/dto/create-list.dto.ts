import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateListDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({example: 'MyTaskBoard', description: 'The name of TasksList'})
  readonly name: string;

}
