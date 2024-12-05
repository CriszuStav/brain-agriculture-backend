import { Type } from 'class-transformer';
import { ArrayNotEmpty, IsArray, IsNumber, IsString, ValidateNested } from 'class-validator';
import { CreateCultureDto } from './create-culture.dto';

export class CreateProdutorDto {
  @IsString()
  document: string;

  @IsString()
  name: string;

  @IsString()
  farmName: string;

  @IsString()
  city: string;

  @IsString()
  state: string;

  @IsNumber()
  totalArea: number;

  @IsNumber()
  agricultureArea: number;

  @IsNumber()
  vegetationArea: number;

  @IsArray()
  @ArrayNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => CreateCultureDto)
  cultures: CreateCultureDto[];
}
