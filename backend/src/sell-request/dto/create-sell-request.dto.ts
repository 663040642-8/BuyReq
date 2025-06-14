import { IsOptional, IsString, IsInt, IsNumber, IsEnum, IsUUID } from "class-validator";

export enum SellRequestStatus {
  PENDING = 'pending',
  ACCEPTED = 'accepted',
  REJECTED = 'rejected',
}

export class CreateSellRequestDto {
  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsInt()
  quantityOffered?: number;

  @IsOptional()
  @IsNumber()
  priceOffered?: number;

  @IsOptional()
  @IsEnum(SellRequestStatus)
  status?: SellRequestStatus;

  @IsUUID()
  buyRequestId: string;
}
