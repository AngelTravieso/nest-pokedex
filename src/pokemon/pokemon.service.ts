import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { Model, isValidObjectId } from 'mongoose';
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
      this.handleExceptions( err );
    }

  }

  findAll() {
    return `This action returns all pokemon`;
  }

  async findOne(term: string) {

    let pokemon: Pokemon;

    // Si es un numero
    if( !isNaN(+term)) {
      // Busco pokemon por número
      pokemon = await this.pokemonModel.findOne({
        no: term, // número
      });
    }

    // Buscar por MongoID, el term debe ser un MongoID válido
    if( !pokemon && isValidObjectId( term ) ) {
      pokemon = await this.pokemonModel.findById( term );
    }

    // Name
    if( !pokemon ) { // Si hasta aca no se ha encontrado un pokemon, lo busco por nombre
      pokemon = await this.pokemonModel.findOne({ name: term.toLowerCase().trim() });
    }

    if( !pokemon ) {
      throw new NotFoundException(`Pokemon with id, name or no '${ term }' not found`);
    }

    return pokemon;
  }

  async update( term : string, updatePokemonDto: UpdatePokemonDto ) {
    
    // pokemon es un objeto de mongoose
    const pokemon = await this.findOne( term );

    if( updatePokemonDto.name ) {
        // Si viene el nombre, lo convierto en minúsculas
        updatePokemonDto.name = updatePokemonDto.name.toLocaleLowerCase();
    }

    // Mando toda la data, que es mi DTO
    // const updatedPokemon = await pokemon.updateOne( updatePokemonDto, { new: true } ); // esto es para devolver el nuevo objeto

    try {
      await pokemon.updateOne( updatePokemonDto );
      return { ...pokemon.toJSON(), ...updatePokemonDto };

    } catch(err) {
      this.handleExceptions( err );
    }

  }

  async remove( id: string ) {

    // // Buscar pokemon
    // const pokemon = await this.findOne( id );

    // // Eliminar de la BD
    // await pokemon.deleteOne();

    // Eliminar de la BD (una sola consulta)
    // const result = await this.pokemonModel.findByIdAndDelete( id );

    const { deletedCount } = await this.pokemonModel.deleteOne({
      _id: id // Eliminar pokemon cuyo id sea igual al que recibo como argumento
    });

    // Si deletedCount es 0, significa que no borro nada
    if( deletedCount === 0 ) {
      throw new BadRequestException(`Pokemon with id '${ id }' not found`);
    }

    return;

  }
  
  private handleExceptions( error: any ) {

    // Hubo un registro en la BD que coincide con algún valor enviado
    if(error.code === 11000) {
      throw new BadRequestException(`Pokemon exist in DB ${ JSON.stringify( error.keyValue ) }`);
    }
      
    console.log(error);
    // Debe ser otro error
    throw new InternalServerErrorException(`Can't create Pokemon - Check server logs`);

  }

}
