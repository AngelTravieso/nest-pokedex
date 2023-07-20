import { IsNumber, IsOptional, IsPositive, Min } from "class-validator";

export class PaginationDto {

    @IsOptional()
    @IsPositive()
    @IsNumber()
    @Min(1)
    limit?: number;

    @IsOptional() // puede venir
    @IsPositive() // si viene debe ser positivo
    @IsNumber() // debe ser un número
    offset?: number;

}