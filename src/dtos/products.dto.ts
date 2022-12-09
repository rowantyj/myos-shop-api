import {
  IsString,
  IsUrl,
  IsDecimal,
  IsInt,
  IsDateString,
} from 'class-validator';

export class CreateProductDto {
  @IsString()
  public title: string;
}
