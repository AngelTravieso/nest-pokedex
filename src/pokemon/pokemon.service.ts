import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { Model } from 'mongoose';
import { Pokemon } from './entities/pokemon.entity';

import { CreatePokemonDto, UpdatePokemonDto } from './dto';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class PokemonService {

  constructor(
    // Es para poder inyectar modelos en este servicio
    @InjectModel( Pokemon.name )
    private readonly pokemonModel = Model<Pokemon>,
  ) {}

  async create(createPokemonDto: CreatePokemonDto) {
    createPokemonDto.name = createPokemonDto.name.toLocaleLowerCase();

    try {

      // Crear nuevo pokemon en la BD
      const pokemon = await this.pokemonModel.create( createPokemonDto );
  
      return pokemon;
    } catch(err) {
      
      // Registro que coincide con este valor
      if(err.code === 11000) {
        // Cuando se lanza un throw el código no sigue ejecutandose, es como hacer un return
        throw new BadRequestException(`Pokemon exist in DB ${ JSON.stringify( err.keyValue ) }`);
      }
      
      console.log(err);
      // Debe ser otro error
      throw new InternalServerErrorException(`Can't create Pokemon - Check server logs`);

    }

  }

  findAll() {
    return `This action returns all pokemon`;
  }

  findOne(id: number) {
    return `This action returns a #${id} pokemon`;
  }

  update(id: number, updatePokemonDto: UpdatePokemonDto) {
    return `This action updates a #${id} pokemon`;
  }

  remove(id: number) {
    return `This action removes a #${id} pokemon`;
  }
}
