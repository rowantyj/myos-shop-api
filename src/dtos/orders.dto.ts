import { IsString } from 'class-validator';

export class CreateOrderDto {
  @IsString()
  public status: string;
}
