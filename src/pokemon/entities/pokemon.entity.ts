import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

// Una entidad es una relación con una tabla de la BD
// En mongoDB son colecciones

// Indicar que es un Schema de la BD
@Schema()
export class Pokemon extends Document {

    // id: string // Mongo me lo da
    
    @Prop({
        unique: true, // el nombre debe ser unico
        index: true, // Indexar campo
    })
    name: string;

    @Prop({
        unique: true,
        index: true,
    })
    no: number;

}

// Exportar el schema
export const PokemonSchema = SchemaFactory.createForClass( Pokemon );