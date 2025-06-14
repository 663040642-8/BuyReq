import { IsString, IsOptional, IsNumber, IsInt, Min, IsNotEmpty, MaxLength } from 'class-validator';

export class CreateBuyRequestDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  title: string;

  @IsString()
  @IsOptional()
  @MaxLength(500)
  description?: string;

  @IsNumber()
  @IsOptional()
  @Min(0)
  minPrice?: number;

  @IsNumber()
  @IsOptional()
  @Min(0)
  maxPrice?: number;

  @IsInt()
  @IsOptional()
  @Min(1)
  quantity?: number;
}
