import { PartialType } from '@nestjs/mapped-types';
import { CreateBuyRequestDto } from './create-buy-request.dto';

export class UpdateBuyRequestDto extends PartialType(CreateBuyRequestDto) {}
