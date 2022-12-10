import { IsArray } from 'class-validator';

export class CreateOrderDto {
  @IsArray()
  public items: BigInt[];
}
