import { IsString, IsUrl, IsDecimal, IsInt, IsUUID } from 'class-validator';

export class CreateProductDto {
  @IsUUID()
  public uuid: string;
  @IsString()
  public title: string;
  @IsString()
  public description: string;
  @IsUrl()
  public picture: string;
  @IsString()
  public currency: string;
  @IsDecimal()
  public price: number;
  @IsInt()
  public quantity: number;
}
