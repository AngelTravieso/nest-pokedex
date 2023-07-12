import { Module } from '@nestjs/common';
import { PokemonService } from './pokemon.service';
import { PokemonController } from './pokemon.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Pokemon, PokemonSchema } from './entities/pokemon.entity';

@Module({
  controllers: [PokemonController],
  providers: [PokemonService],
  imports: [
    MongooseModule.forFeature(
      [
        {
          name: Pokemon.name, // El name sale del extends Document que tiene la entity
          schema: PokemonSchema, // Schema definido en el entity
        }
      ]
    )
  ]
})
export class PokemonModule {}
