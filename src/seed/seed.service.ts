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

    // Limpiar tabla antes de correr el SEED
    await this.pokemonModel.deleteMany({}); // delete * from pokemons

    // * fetch solo funcionara a partir de Node 18

    // Tipar respuesta con la interface PokeResponse
    const { data } = await this.axios.get<PokeResponse>('https://pokeapi.co/api/v2/pokemon?limit=650');

    // * MANERA DE INSERTAR MULTIPLES REGISTROS SIMULTANEAMENTE

    // 1-
    // const insertPromisesArray = [];

    // 2-
    const pokemonToInsert: { name: string, no: number }[] = [];

    data.results.forEach( ({ name, url }) => {
      // console.log({name, url});

      // Split para buscar el N° (id) del pokemon
      const segments = url.split('/')
      const no = +segments[segments.length - 2]; // Obtener ID Pokemon
      // console.log({ name, no });

      // await this.pokemonModel.create({ no, name });

      // Insertar promesas en el arreglo
      // insertPromisesArray.push(
      //   this.pokemonModel.create({ name, no }) // => esto es una promesa
      // );

      pokemonToInsert.push({ name, no });

    });

    // Ejecutar las promesas de crear pokemon
    // await Promise.all( insertPromisesArray );

    await this.pokemonModel.insertMany( pokemonToInsert );

    return 'SEED EXECUTED';

  }

}
