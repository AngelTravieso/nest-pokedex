import { Injectable } from '@nestjs/common';
import { PokeResponse } from './interfaces/poke-response.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Pokemon } from 'src/pokemon/entities/pokemon.entity';
import { Model } from 'mongoose';
import { AxiosAdapter } from 'src/common/adapters/axios.adapter';

@Injectable()
export class SeedService {

  constructor(
    @InjectModel( Pokemon.name )
    private readonly pokemonModel = Model<Pokemon>,
    private readonly http:AxiosAdapter,
  ) {}
  
  async executeSeed() {

    // Limpiar tabla antes de correr el SEED
    await this.pokemonModel.deleteMany({}); // delete * from pokemons

    // * fetch solo funcionara a partir de Node 18

    // Tipar respuesta con la interface PokeResponse
    const data = await this.http.get<PokeResponse>('https://pokeapi.co/api/v2/pokemon?limit=650');

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
