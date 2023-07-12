import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { CreatePokemonDto } from './pokemon/dto/create-pokemon.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post()
  createPokemon( @Body() createPokemonDto: CreatePokemonDto ) {
    return this.appService.create( createPokemonDto );
  }
}
