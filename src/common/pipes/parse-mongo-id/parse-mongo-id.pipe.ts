import { ArgumentMetadata, Injectable, PipeTransform, BadRequestException } from '@nestjs/common';
import { isValidObjectId } from 'mongoose';

@Injectable()
export class ParseMongoIdPipe implements PipeTransform {

  transform(value: string, metadata: ArgumentMetadata) {
    // console.log({value, metadata});

    // Si no es un MongoID válido
    if( !isValidObjectId( value )) {
      // 400 bad request
      throw new BadRequestException(`${ value } is not a valid MongoID`);
    }

    // return value.toUpperCase();
    return value;
  }

}
