import { Injectable } from '@nestjs/common';
import { CreatePokemonDto } from './pokemon/dto/create-pokemon.dto';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  create( createPokemonDto: CreatePokemonDto ) {
    return createPokemonDto;
  }

}
