import { join } from 'path';
import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { PokemonModule } from './pokemon/pokemon.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    // Configuración para carpeta static/public
    ServeStaticModule.forRoot({
      rootPath: join(__dirname,'..','public'),
      }),


      MongooseModule.forRoot(
        // URI de la BD de mongo
        'mongodb://localhost:27017/nest-pokemon'
      ),

    PokemonModule,
  ],
})

export class AppModule {}
