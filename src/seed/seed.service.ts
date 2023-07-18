import { Injectable } from '@nestjs/common';
import axios, { AxiosInstance } from 'axios';
import { PokeResponse } from './interfaces/poke-response.interface';

@Injectable()
export class SeedService {

  private readonly axios: AxiosInstance = axios;
  
  async executeSeed() {

    // * fetch solo funcionara a partir de Node 18

    // Tipar respuesta con la interface PokeResponse
    const { data } = await this.axios.get<PokeResponse>('https://pokeapi.co/api/v2/pokemon?limit=10');

    data.results.forEach(({ name, url }) => {
      // console.log({name, url});

      // Split para buscar el N° (id) del pokemon
      const segments = url.split('/')
      const no = +segments[segments.length - 2]; // Obtener ID Pokemon
      console.log({ name, no });

    });

    return data.results;

  }

}
