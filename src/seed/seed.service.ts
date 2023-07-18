import { Injectable } from '@nestjs/common';
import axios, { AxiosInstance } from 'axios';
import { PokeResponse } from './interfaces/poke-response.interface';
import { CreatePokemonDto } from 'src/pokemon/dto';
import { InjectModel } from '@nestjs/mongoose';
import { Pokemon } from 'src/pokemon/entities/pokemon.entity';
import { Model } from 'mongoose';

@Injectable()
export class SeedService {

  private readonly axios: AxiosInstance = axios;
  
  constructor(
    @InjectModel( Pokemon.name )
    private readonly pokemonModel = Model<Pokemon>,
  ) {}
  
  async executeSeed() {

    // * fetch solo funcionara a partir de Node 18

    // Tipar respuesta con la interface PokeResponse
    const { data } = await this.axios.get<PokeResponse>('https://pokeapi.co/api/v2/pokemon?limit=10');

    data.results.forEach( async ({ name, url }) => {
      // console.log({name, url});

      // Split para buscar el N° (id) del pokemon
      const segments = url.split('/')
      const no = +segments[segments.length - 2]; // Obtener ID Pokemon
      // console.log({ name, no });

      await this.pokemonModel.create({ no, name });

    });

    return 'SEED EXECUTED';

  }

}
