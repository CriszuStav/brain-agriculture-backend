import { Type } from 'class-transformer';
import { ArrayNotEmpty, IsArray, IsNumber, IsString, ValidateNested } from 'class-validator';

export class CreateCultureDto {
  @IsString()
  name: string;
}