import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';

@Injectable()
export class ParseIdPipe implements PipeTransform<string, number> {
  transform(value: string, metadata: ArgumentMetadata) {
    const id = parseInt(value, 10);
    if (isNaN(id) || id < 1) {
      throw new BadRequestException('id is not positive integer');
    }
    return id;
  }
}
